#!/bin/bash

function prompt_user {
    read -p "$1 (default: $2): " user_input
    echo ${user_input:-$2}
}

echo "========================================================="
echo "Running pw-front-svelte/build.sh..."
printf "=========================================================\n\n"

echo "Set your pw-back URL. This is http://<your host domain>:3030"
SERVER_URL=$(prompt_user "Enter SERVER_URL (Where pw-back is exposed) MUST start with http:// or https://" "$(hostname -I | awk '{print $1}'):3030/")
echo "Same as Server URL, but using Port 3080. MUST start with http:// or https://"
PALDEX_API_URL=$(prompt_user "Enter PALDEX_API_URL" "$(hostname -I | awk '{print $1}'):3080/")
echo ""
echo "You'll need a youtube api key to display streams on the dashboard."
echo "Get one here: https://console.cloud.google.com/apis/dashboard."
echo "You can use default val 'NO_STREAMS' if you don't want random streams on the dashboard."
YT_API_KEY=$(prompt_user "Enter YT_API_KEY (Youtube API Key)" "NO_STREAMS")

# Install npm dependencies for pw-back
echo "Installing npm dependencies for pw-front..."
npm install

# Build the Package
export PUBLIC_SERVER_URL=$SERVER_URL
export PUBLIC_PALDEX_API_URL=$PALDEX_API_URL
export PUBLIC_YT_API_KEY=$YT_API_KEY

npm run build

# Set file permissions to executable
printf "\nsetting executable(a+x) permissions for dist/index.js\n\n"
chmod a+x build/index.js
ls -l build/index.js

chmod a+x ./build/index.js;
chmod a+x ./bin/startup.sh;


printf "\n>>>pw-front-svelte/build.sh successfully completed.\n\n"
