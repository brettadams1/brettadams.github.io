#!/bin/bash

cd projects
git clone https://github.com/operationspark/runtime
cd runtime
rm -rf .git*
npm install -g opspark
bower install
cd ../..
git add -A
git commit -m "added runtime"
git push