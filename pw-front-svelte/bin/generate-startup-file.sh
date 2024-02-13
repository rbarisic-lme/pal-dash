#!/bin/bash

current_user=$(whoami)

function prompt_user {
    read -p "$1 (default: $2): " user_input
    echo ${user_input:-$2}
}

# Set the working directory to the project root
working_dir="$(dirname "$0")/.."

cd $working_dir

echo "========================================================="
echo " Running pw-front/generate-startup-file.sh..."
echo " Current User: $current_user"
echo " Working in: $(pwd)"
printf "=========================================================\n\n"

echo "Please enter the necessary environment values needed to"
echo "build the startup.sh file. This is needed to run the"
echo "service properly."
echo ""

echo "Setting NODE executable location."
WHICH_NODE=$(prompt_user "Enter NODE bin path" "$(which node)")

# Confirm with the user
read -p "Is the provided information correct? (y/n): " confirmation
if [[ $confirmation != "y" && $confirmation != "Y" ]]; then
    echo "Please run the script again and provide the correct information."
    exit 1
fi

# = START FILE CREATION ==================================================

# Define the service file content
STARTUP_FILE_CONTENT="#!/bin/sh

# Run the Node.js script
$WHICH_NODE $(pwd)/build/index.js
"

# Create the startup script under the specified working directory
echo "$STARTUP_FILE_CONTENT" > $(pwd)/bin/startup.sh

# Make the script executable
chmod a+x "$(pwd)/bin/startup.sh"

echo "Script generated successfully: $(pwd)/bin/startup.sh"
