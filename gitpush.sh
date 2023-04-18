#!/bin/bash

git add .
echo "Enter the commit message you want to use: "
read commit_message
git commit -m $commit_message
git push