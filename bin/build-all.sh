#!/bin/bash

echo "========================================================="
echo "PalDash Installer - Build All Script       rbarisic / xiq"
echo "========================================================="
echo ""
echo "This will install all dependencies for PalDash, as well as create service entries in your systemd"
echo "start services with 'service pw-back start' and service 'pw-front-start'"
echo "Make sure ports 3020, 3030 and 3080 are free, or change them via the bin/startup.sh scripts."
echo ""

# Set the working directory to the project root
cd "$(dirname "$0")/.."

# Display current working directory
echo "Current working directory (should end with '/pal-dashboard'): $(pwd)"

# Ask user if they want to continue
read -p "Do you want to continue? (y/n): " answer

echo "setting executable(a+x) build.sh and startup.sh permissions in respective folders"
chmod a+x pw-back/bin/startup.sh
chmod a+x pw-back/bin/build.sh

ls -l pw-back/bin
chmod a+x pw-front-svelte/bin/startup.sh
chmod a+x pw-front-svelte/bin/build.sh
ls -l pw-front-svelte/bin
echo "permissions should be read execute"
echo ""

# Check user's response
if [[ "$answer" != "y" && "$answer" != "Y" ]]; then
    echo "Build process aborted."
    exit 0
fi

# Change directory to pw-back
cd ./pw-back

# Run any build commands specific to pw-back if needed
# Example: npm run build
bin/build.sh

echo "Press any key to continue" && read -n 1 -s

# Change directory back to the project root
cd ..

# Change directory to pw-front
cd ./pw-front-svelte

# Run any build commands specific to pw-front if needed
# Example: npm run build
bin/build.sh

# Change directory back to the project root
cd ..

echo "========================================================="
echo " BUILD PROCESS COMPLETED"
echo ""
echo " You should run"
echo ""
echo " bin/install-services.sh"
echo ""
echo " To install PalDash as a system service under linux."
echo "========================================================="
