#!/bin/bash
echo "========================================================="
echo "Running pw-back/build.sh..."
printf "=========================================================\n\n"

# Install npm dependencies for pw-back
echo "Installing npm dependencies for pw-back..."
npm install

# Build the Package
npm run build

# Set file permissions to executable
printf "\nsetting executable(a+x) permissions for dist/index.js\n\n"
chmod a+x dist/index.js
ls -l dist/index.js

printf "\n>>>pw-back/build.sh successfully completed.\n\n"
