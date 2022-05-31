#!/bin/bash

npm run build
git checkout pages
rm -rf docs
mv public docs
git add docs/
git commit -m "deploy $(date)"

git checkout main
