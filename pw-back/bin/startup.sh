#!/bin/sh

# Set environment variables
export PORT=3030
export ROOT_DIR=/home/xiq/srv/palworld
export PAL_DIR=/home/xiq/srv/palworld/game/Pal
export SERVER_ID=0
export WORLD_GUID=F37D14B248EFAFC63FB56E8E65671166
export PYTHON_RUNTIME=python3

# Run the Node.js script
/home/xiq/.nvm/versions/node/v21.6.1/bin/node /home/xiq/srv/pal-dashboard/pw-back/dist/index.cjs

