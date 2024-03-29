#!/bin/bash

current_user=$(whoami)

function prompt_user {
    read -p "$1 (default: $2): " user_input
    echo ${user_input:-$2}
}

generate_random_password() {
    openssl rand -base64 18
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

read -p "Did it contain the files? (y/n): " user_response

if [[ "$user_response" != "y" && "$user_response" != "Y" ]]; then
    echo "Please check and run the script again."
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

# Generate 4 random characters to add to default admin name
RANDOM_CHARS=$(LC_CTYPE=C tr -dc 'a-zA-Z0-9' < /dev/urandom | head -c 4)

echo "We will now generate your admin USERNAME and PASSWORD."
echo "Please write them down!"
ADMIN_USERNAME=$(prompt_user "Enter ADMIN Username" "admin-$RANDOM_CHARS")
ADMIN_PASSWORD=$(prompt_user "Enter ADMIN Password" "$(generate_random_password 12)")

ADMIN_PASSWORD_HASHED=$(npm run password "$admin_password" | tail -n 1)

echo "Your hashed password is: $ADMIN_PASSWORD_HASHED"

sleep 2

APP_SECRET=$(openssl rand -hex 16)
printf "\nGenerated Random 32-char App Secret using OpenSSL: $APP_SECRET\n\n"

DB_TYPE=$(prompt_user "Enter Database Type [couchdb] (currently only couchdb supported)" "couchdb")

COUCHDB_URL=$(prompt_user "Enter COUCHDB_URL" "127.0.0.1:5984/")
COUCHDB_COOKIE=$(prompt_user "Enter COUCHDB_COOKIE" "7F036914FA8642C8A698BFF053CB9E50")
COUCHDB_DB=$(prompt_user "Enter COUCHDB_DB" "pal-dash")
COUCHDB_USER=$(prompt_user "Enter COUCHDB_USER" "admin")
COUCHDB_PW=$(prompt_user "Enter COUCHDB_PW" "admin-password")

# Display the provided information for confirmation
echo "Provided information:"
echo "PORT: $PORT"
echo "ROOT_DIR: $ROOT_DIR"
echo "PAL_DIR: $PAL_DIR"
echo "SERVER_ID: $SERVER_ID"
echo "WORLD_GUID: $WORLD_GUID"
echo "PYTHON_RUNTIME: $PYTHON_RUNTIME"
echo "ADMIN_USERNAME: $ADMIN_USERNAME"
echo "ADMIN_PASSWORD: $ADMIN_PASSWORD_HASHED"
echo "APP_SECRET: $APP_SECRET"
echo "DB_TYPE: $DB_TYPE" 
echo "COUCHDB_URL: $COUCHDB_URL" 
echo "COUCHDB_COOKIE: $COUCHDB_COOKIE" 
echo "COUCHDB_DB: $COUCHDB_DB" 
echo "COUCHDB_USER: $COUCHDB_USER" 
echo "COUCHDB_PW: $COUCHDB_PW" 
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
export APP_SECRET=$APP_SECRET
export ADMIN_USERNAME=$ADMIN_USERNAME
export ADMIN_PASSWORD=$ADMIN_PASSWORD_HASHED
export DB_TYPE=$DB_TYPE
export COUCHDB_URL=$COUCHDB_URL 
export COUCHDB_COOKIE=$COUCHDB_COOKIE 
export COUCHDB_DB=$COUCHDB_DB 
export COUCHDB_USER=$COUCHDB_USER 
export COUCHDB_PW=$COUCHDB_PW 

# Run the Node.js script
$WHICH_NODE $(pwd)/dist/index.js
"

# Create the startup script under the specified working directory
echo "$STARTUP_FILE_CONTENT" > $(pwd)/bin/startup.sh

# Make the script executable
chmod a+x "$(pwd)/bin/startup.sh"

echo "Script generated successfully: $(pwd)/bin/startup.sh"
