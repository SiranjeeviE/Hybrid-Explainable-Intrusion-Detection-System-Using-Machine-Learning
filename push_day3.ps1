$files = @(
    ".gitignore",
    "backend/data/KDDTest+.txt",
    "backend/data/KDDTrain+.txt",
    "frontend/.gitignore",
    "frontend/README.md",
    "frontend/eslint.config.js",
    "frontend/index.html",
    "frontend/package.json",
    "frontend/postcss.config.js",
    "frontend/src/App.css"
)

foreach ($file in $files) {
    git add "$file"
    $basename = Split-Path $file -Leaf
    if ($basename -eq "") { $basename = $file }
    git commit -m "$basename"
}

git push origin main
