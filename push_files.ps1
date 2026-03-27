git init
git branch -M main
git remote remove origin 2>$null
git remote add origin https://github.com/SiranjeeviE/Hybrid-Explainable-Intrusion-Detection-System-Using-Machine-Learning.git

$files = @(
    "README.md",
    "backend/app.py",
    "backend/train_model.py",
    "backend/requirements.txt",
    "backend/models/model.pkl",
    "backend/models/scaler.pkl",
    "backend/models/features.pkl",
    "frontend/src/App.jsx",
    "frontend/src/index.css",
    "frontend/tailwind.config.js"
)

foreach ($file in $files) {
    git add "$file"
    $basename = Split-Path $file -Leaf
    git commit -m "$basename"
}

git push -u origin main --force
