#!/bin/bash

echo "========================================================="
echo "PalDash Service Installer - pw-back        rbarisic / xiq"
echo "========================================================="

current_user=$(whoami)
echo "Installing for Current user: $current_user"

# Set the working directory to the script's location
cd "$(dirname "$0")/.."
echo "Working directory is $(pwd)"

# Define the service file content
SERVICE_FILE_CONTENT="[Unit]
Description=Palworld Dashboard Backend
Documentation=https://github.com/rbarisic-lme/pal-dash

[Service]
Restart=always
User=xiq
WorkingDirectory=$(pwd)
ExecStart=$(pwd)/bin/startup.sh

[Install]
WantedBy=multi-user.target
"

# Write the content to the service file
echo "$SERVICE_FILE_CONTENT" > pw-back.service
echo ""
echo "START FILE =============================================="
cat pw-back.service
echo "END FILE ================================================"
echo ""
ls -l pw-back.service

echo "Service file 'pw-back.service' created successfully."

# Move the service file to /etc/systemd/system/
sudo mv ./pw-back.service /etc/systemd/system/
sudo ls -l /etc/systemd/system/pw-back.service
echo "File copied to /etc/systemd/system/"

echo "Service for pw-back successfully installed!"
