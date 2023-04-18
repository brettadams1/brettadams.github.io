#!/bin/bash

git add .
read -p 'Enter the commit message you want to use: ' commit_message
echo $commit_message
git commit -m "$commit_message"
git push