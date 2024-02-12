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
echo " Running pw-back/generate-startup-file.sh..."
echo " Current User: $current_user"
echo " Working in: $(pwd)"
printf "=========================================================\n\n"

echo "Please enter the necessary environment values needed to"
echo "build the startup.sh file. This is needed to run the"
echo "service properly."
echo ""

# Prompt user for input variables
echo "Setting PORT. Leave this at 3030 for PalDash Frontend to work correctly."
PORT=$(prompt_user "Enter PORT" 3030)
ROOT_DIR=$(prompt_user "Enter ROOT_DIR" "/home/$current_user/srv/palworld")

# check ROOT_DIR
echo ""
echo "checking ROOT_DIR. This should contain the following files:"
echo "docker-compose.yml, enter-server.sh, game"
echo ""
ls -1 $ROOT_DIR
echo ""

read -p "Did it contain the files? (yes/no): " user_response
if [ "$user_response" == "yes" ]; then
    echo "Great! Proceeding with the script."
elif [ "$user_response" == "no" ]; then
    echo "Please check and run the script again."
    exit 1
else
    echo "Invalid response. Please enter 'yes' or 'no'."
    exit 1
fi

echo ""
echo "checking PAL_DIR. This should contain a folder called 'Saved':"
echo "PAL_DIR Content:"
ls -1 $ROOT_DIR/game/Pal
echo ""
PAL_DIR=$(prompt_user "Enter PAL_DIR" "$ROOT_DIR/game/Pal")

echo ""
echo "Server ID: For jammsen (docker) Servers, this should be 0"
echo "The following Server IDs have been found:"
ls -1 $PAL_DIR/Saved/SaveGames/
echo ""

SERVER_ID=$(prompt_user "Enter SERVER_ID" 0)

echo "Checking WORLD_GUID. This should be your world folder, directly under $SERVER_ID/:"
ls -1 $PAL_DIR/Saved/SaveGames/$SERVER_ID/
echo ""
WORLD_GUID=$(prompt_user "Enter WORLD_GUID" "F37D14B248EFAFC63FB56E8E65671166")

echo "Setting NODE executable location."
WHICH_NODE=$(prompt_user "Enter NODE bin path" "$(which node)")

PYTHON_RUNTIME=$(prompt_user "Enter PYTHON_RUNTIME" "python3")

# Test if the specified Python runtime is executable and starts with "Python 3"
if ! "$PYTHON_RUNTIME" --version 2>&1 | grep -q "Python 3"; then
    echo "Error: '$PYTHON_RUNTIME' is not a valid Python 3 executable. Please provide a correct Python runtime."
    printf "\nScript will continue anyway.\n"
    printf "."
    sleep 1 # wait for 1 second
    printf ".\n"
    sleep 1 # wait for 1 second
else
  echo "Python 3 Runtime has been verified. Proceeding..."
  echo ""
  sleep 1
fi

# Display the provided information for confirmation
echo "Provided information:"
echo "PORT: $PORT"
echo "ROOT_DIR: $ROOT_DIR"
echo "PAL_DIR: $PAL_DIR"
echo "SERVER_ID: $SERVER_ID"
echo "WORLD_GUID: $WORLD_GUID"
echo "PYTHON_RUNTIME: $PYTHON_RUNTIME"
echo ""

# Confirm with the user
read -p "Is the provided information correct? (y/n): " confirmation
if [[ $confirmation != "y" && $confirmation != "Y" ]]; then
    echo "Please run the script again and provide the correct information."
    exit 1
fi

# = START FILE CREATION ==================================================

# Define the service file content
STARTUP_FILE_CONTENT="#!/bin/sh

# Set environment variables
export PORT=$PORT
export ROOT_DIR=$ROOT_DIR
export PAL_DIR=$PAL_DIR
export SERVER_ID=$SERVER_ID
export WORLD_GUID=$WORLD_GUID
export PYTHON_RUNTIME=$PYTHON_RUNTIME

# Run the Node.js script
$WHICH_NODE $(pwd)/dist/index.cjs
"

# Create the startup script under the specified working directory
echo "$STARTUP_FILE_CONTENT" > $(pwd)/bin/startup.sh

# Make the script executable
chmod a+x "$(pwd)/bin/startup.sh"

echo "Script generated successfully: $(pwd)/bin/startup.sh"
