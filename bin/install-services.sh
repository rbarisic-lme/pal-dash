#!/bin/bash
echo "========================================================="
echo "PalDash Service Installer                  rbarisic / xiq"
echo "========================================================="
echo ""
echo "This will install pw-back and pw-front as services on your machine"
echo "so that they can be run via sytemd."
echo "Information about this is available in the readme file of the projects repo:"
echo "https://github.com/rbarisic-lme/pal-dash"
echo ""
echo "WARNING: This script will run some SUDO commands to copy files!"
echo ""
# Set the working directory to the project root
project_root="$(dirname "$0")/.."

cd $project_root

# Display current working directory
printf "\nCurrent working directory (project root directory, should end with e.g. '/pal-dash'):\n$(pwd)\n\n"

# Ask user if they want to continue
read -p "Do you want to continue? (y/n): " answer

# Check user's response
if [[ "$answer" != "y" && "$answer" != "Y" ]]; then
    echo "Build process aborted."
    exit 0
fi

# Run the service installer for pw-back

cd ./pw-back
chmod a+x bin/install-service.sh
echo "Set execute permissions for backend service install script"
ls -l bin/install-service.sh
echo ""

bin/install-service.sh

# Run the service installer for pw-front

# Go back to the project root
cd ../pw-front-svelte
chmod a+x bin/install-service.sh
echo "Set execute permissions for frontend service install script"
ls -l bin/install-service.sh
echo ""

bin/install-service.sh

printf "\n=========================================================\n"
echo " SERVICE INSTALL COMPLETE"
echo ""
echo " You should run"
echo ""
echo " sudo systemctl daemon-reload"
echo ""
echo " sudo service pw-back start"
echo " sudo service pw-front start"
echo ""
echo " To finalize the installation."
printf "\n=========================================================\n\n"

echo "Do you want to run 'sudo systemctl daemon-reload'?"
read -p "This will reload your systemd manager configuration (y/n): " reload_answer

if [[ "$reload_answer" == "y" || "$reload_answer" == "Y" ]]; then
    sudo systemctl daemon-reload
    echo "Systemctl daemon-reload completed."
else
    echo "Skipping systemctl daemon-reload."
fi

echo ""

read -p "Do you want to start the pal-dash services? (y/n): " start_services_answer

if [[ "$start_services_answer" == "y" || "$start_services_answer" == "Y" ]]; then
    sudo service pw-back start
    sudo service pw-front start
    echo "Services 'pw-back' and 'pw-front' started via sudo service pw-[back|front] start."
    echo "Checking logs... (q to exit)"
    echo ""
    sudo service pw-back status
    sudo service pw-front status
else
    echo "Skipping systemctl daemon-reload."
fi


echo ""

echo "Final Install Step complete. Check Dashboard at <your-server-url:3000>"
