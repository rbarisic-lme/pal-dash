#!/bin/bash
echo "========================================================="
echo "PalDash Installer - Install PalDex API     rbarisic / xiq"
echo "========================================================="

echo "Downloading Palworld-Paldex-API V.1.20"
echo "visit (https://github.com/mlg404/palworld-paldex-api) for more info"
echo "thx to Victor Eyer a.k.a. mlg404 for the awesome API!"

# Set the working directory to the project root
cd "$(dirname "$0")/.."

# Display current working directory
echo "Current working directory (should end with '/pal-dash'): $(pwd)"

zipfile_name=paldex-api.zip
unzipped_name=palworld-paldex-api-1.2.0 # unzip and note name before updating this script
git_release_url="https://github.com/mlg404/palworld-paldex-api/archive/refs/tags/v1.2.0.zip"

wget $git_release_url --timestamping -O ./vendor/$zipfile_name

cd ./vendor/

printf "\n\nunzipping palworld-paldex-api...\n\n"
unzip $zipfile_name
palworld-paldex-api-1.2.0
printf "\n unzipping done. cleaning up $zipfile_name\n\n"

rm $zipfile_name

cd $unzipped_name

echo "Edit File: changing port on host machine from 3000 to 3080 in docker-compose.yml"
sed -i 's/"3000:3000"/"3080:3000"/' docker-compose.yml

echo ""
echo "Running Docker Image via daemon (keep in background)"
echo ""
echo "You might need to restart this manually on server restart"
echo "or write a systemd service for it."
echo "systemd service not yet provided by this install script."

printf "\n\nrunning 'docker-compose up -d'\n\n"

docker-compose up -d
echo ""
echo "========================================================="
echo "should be run as docker image now."
echo "If the last command failed, try again with this command:"
echo "cd vendor/$unzipped_name/"
echo "docker-compose up -d"
echo "========================================================="
echo ""
echo "Paldex API installation done."
echo "Press any key to continue" && read -n 1 -s
