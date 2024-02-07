#!/bin/bash
echo "========================================================="
echo "Running pw-back/build.sh..."
printf "=========================================================\n\n"
# Install npm dependencies for pw-back
echo "Installing npm dependencies for pw-back..."
npm install

# Set file permissions to executable
printf "\nsetting executable(a+x) permissions for dist/index.cjs\n\n"
chmod a+x dist/index.cjs
ls -l dist/index.cjs

printf "\n>>>pw-back/build.sh successfully completed.\n\n"
