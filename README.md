# Hybrid Explainable Intrusion Detection System Using Machine Learning

## 1. Introduction

With the rapid growth of network-based systems, cyber-attacks such as Denial of Service (DoS), unauthorized access, and brute-force attacks have increased significantly. Traditional intrusion detection systems rely mainly on signature-based methods, which are effective only for known attacks but fail to detect new or unknown threats.

To overcome this limitation, this project proposes a Hybrid Explainable Intrusion Detection System (IDS) that combines rule-based detection with machine learning techniques. This system enhances detection accuracy and provides interpretability for better understanding of predictions.

## 2. Objective

The main objectives of the project are:
- To detect malicious network activities using machine learning
- To combine rule-based and ML-based detection (hybrid system)
- To improve detection of unknown attacks
- To provide explainable results for better transparency
- To build a deployable system with backend and frontend

## 3. Dataset Used

The project uses the **NSL-KDD** dataset.

**Key Characteristics:**
- Contains 41 features representing network connections
- Includes both normal and attack traffic
- Attack types include: DoS (Denial of Service), Probe, R2L (Remote to Local), U2R (User to Root)

This dataset is widely used for intrusion detection research and provides a balanced and clean structure for training machine learning models.

## 4. Technologies Used

**Backend:**
- Python, Pandas, NumPy, Scikit-learn, Flask, Joblib

**Frontend:**
- React (Vite), TailwindCSS / CSS

## 5. System Architecture

The system follows a modular architecture:
```text
User Input (React UI)
        ↓
Flask Backend API
        ↓
Rule-Based Engine
        ↓
ML Model (Random Forest Pipeline)
        ↓
Explainability Layer
        ↓
Prediction Output
```

## 6. Methodology

### 6.1 Data Preprocessing
- Handling missing values
- Encoding categorical features (`protocol_type`, `service`, `flag`)
- Feature scaling using `StandardScaler`
- Splitting dataset into training and testing

### 6.2 Model Training
A **Random Forest Classifier** is used as the primary model due to its robustness and ability to handle complex data.
Other models tested: Logistic Regression, Decision Tree.
The best-performing model is selected based on evaluation metrics.

### 6.3 Hyperparameter Tuning
Hyperparameters such as Number of trees (`n_estimators`) and Maximum depth (`max_depth`) are optimized using Grid Search with cross-validation.

### 6.4 Rule-Based System
A rule-based engine is implemented to detect known attack patterns.
- Example: High number of failed logins → Brute-force attack
- Example: High traffic count → Possible DoS attack

### 6.5 Hybrid System
The final system combines both approaches:
- Rule-based detection is applied first
- If no rule is triggered, the ML model is used
This ensures detection of both known and unknown attacks.

### 6.6 Explainability
The system provides explanations using Feature Importance and SHAP to identify which features contributed to the prediction.

### 6.7 Model Saving and Deployment
- The trained model is saved using Joblib (`model.pkl`, `scaler.pkl`)
- A Flask API is created with a `/predict` endpoint
- The model is integrated with a React frontend

## 7. Results

The system successfully:
- Detects network intrusions with high accuracy
- Reduces false negatives using recall optimization
- Provides interpretable predictions
- Works in a hybrid mode for improved performance

## 8. Advantages
- Detects both known and unknown attacks
- Provides explainable outputs
- Modular and scalable architecture
- Real-world applicability

## 9. Limitations
- Depends on dataset quality
- Not fully real-time (unless extended)
- Requires preprocessing consistency

## 10. Future Enhancements
- Real-time network traffic analysis
- Integration with live monitoring systems
- Use of deep learning models (CNN/RNN)
- Dashboard for visualization
