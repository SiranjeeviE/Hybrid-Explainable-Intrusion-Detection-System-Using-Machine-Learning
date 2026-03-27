$files = git ls-files --others --exclude-standard
foreach ($file in $files) {
    git add "$file"
    $basename = Split-Path $file -Leaf
    if ($basename -eq "") { $basename = $file }
    git commit -m "$basename"
}

# Also catch any modified files that might need adding
git add .
git commit -m "Final synchronization and tracking of all remaining files"

git push origin main
