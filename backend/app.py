from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app)

MODELS_DIR = "models"
try:
    rf_model = joblib.load(os.path.join(MODELS_DIR, "model.pkl"))
    scaler = joblib.load(os.path.join(MODELS_DIR, "scaler.pkl"))
    feature_columns = joblib.load(os.path.join(MODELS_DIR, "features.pkl"))
except Exception as e:
    print("Warning: Models not found, please train them first.", e)
    rf_model = None
    scaler = None
    feature_columns = None

CATEGORICAL_COLS = ['protocol_type', 'service', 'flag']

def rule_based_engine(data):
    """
    Checks if there are obvious patterns of attack before running ML model.
    """
    if float(data.get('num_failed_logins', 0)) > 3:
        return "Attack", "Rule-based: High number of failed logins detected (Brute-force pattern)."
    if float(data.get('src_bytes', 0)) > 50000:
        return "Attack", "Rule-based: Abnormally high source bytes detected (Possible DoS/Botnet)."
    if float(data.get('su_attempted', 0)) > 0:
        return "Attack", "Rule-based: Unauthorized root access attempt detected."
    if float(data.get('is_guest_login', 0)) == 1 and float(data.get('num_compromised', 0)) > 0:
        return "Attack", "Rule-based: Compromised guest login detected."
    
    return None, None

def get_top_features_explanation(input_scaled, model, feature_names):
    """
    Simulates explainability with feature importance. 
    SHAP is heavier, so using tree feature importance weighted by input for local approximation.
    """
    # Simply get global feature importances, ideally local explainability like SHAP is used,
    # but for simplicity/performance we highlight the globally important features that have high values in input.
    importances = model.feature_importances_
    # Weight by the squared scaled input to see which important feature is highly active
    active_importance = importances * (input_scaled[0] ** 2)
    
    top_indices = np.argsort(active_importance)[::-1][:3]
    top_features = [feature_names[i] for i in top_indices]
    
    return f"ML Prediction based mainly on: {', '.join(top_features)}"

@app.route('/predict', methods=['POST'])
def predict():
    if not rf_model or not scaler or not feature_columns:
        return jsonify({"error": "Model not loaded. Train the model first."}), 500
        
    data = request.json
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    # 1. Rule-based Engine Check
    rule_pred, rule_exp = rule_based_engine(data)
    if rule_pred:
        return jsonify({
            "prediction": rule_pred,
            "confidence": 1.0,
            "explanation": rule_exp,
            "source": "Rule-Based"
        })

    # 2. ML Preparation
    # Initialize a row of zeros for all required feature columns
    input_vector = pd.DataFrame(0, index=[0], columns=feature_columns)
    
    # Fill in the values we have
    for key, val in data.items():
        if key in CATEGORICAL_COLS:
            target_col = f"{key}_{val}"
            if target_col in input_vector.columns:
                input_vector.at[0, target_col] = 1
        elif key in input_vector.columns:
            try:
                input_vector.at[0, key] = float(val)
            except ValueError:
                pass # Ignore non-convertible 

    # Scale the input
    input_scaled = scaler.transform(input_vector)

    # 3. Model Prediction
    proba = rf_model.predict_proba(input_scaled)[0]
    pred_class = rf_model.predict(input_scaled)[0] # 0 = normal, 1 = attack
    
    prediction_label = "Attack" if pred_class == 1 else "Normal"
    confidence = float(max(proba))
    
    # 4. Explainability
    explanation = get_top_features_explanation(input_scaled, rf_model, feature_columns)
    
    if pred_class == 0:
         explanation = "Traffic appears normal based on historical patterns."

    return jsonify({
        "prediction": prediction_label,
        "confidence": confidence,
        "explanation": explanation,
        "source": "ML System"
    })

if __name__ == '__main__':
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
