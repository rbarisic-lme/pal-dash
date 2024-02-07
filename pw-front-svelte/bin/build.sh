#!/bin/bash
echo "========================================================="
echo "Running pw-front-svelte/build.sh..."
printf "=========================================================\n\n"
# Install npm dependencies for pw-back
echo "Installing npm dependencies for pw-front..."
npm install

npm run build

# Set file permissions to executable
printf "\nsetting executable(a+x) permissions for dist/index.cjs\n\n"
chmod a+x build/index.js
ls -l build/index.js

chmod a+x ./build/index.js;
chmod a+x ./bin/startup.sh;


printf "\n>>>pw-front-svelte/build.sh successfully completed.\n\n"
