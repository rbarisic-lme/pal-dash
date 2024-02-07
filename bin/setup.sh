echo "__________        .__  ________                .__     "
echo "\______   \_____  |  | \______ \ _____    _____|  |__  "
echo " |     ___/\__  \ |  |  |    |  \\__  \  /  ___/  |  \\"
echo " |    |     / __ \|  |__|    \`   \/ __ \_\___ \|   Y  \\"
echo " |____|    (____  /____/_______  (____  /____  >___|  /"
echo "                \/             \/     \/     \/     \/"
echo "========================================================="
echo "PalDash Installer - Install PalDash V1 -   rbarisic / xiq"
echo "========================================================="
echo ""
echo "This will install all required files for PalDash, including"
echo "dependencies, build files and systemd services."
echo "Scripts can be run individually for debugging purposes."
echo "However, this is the full installer."
echo ""
echo "---------------------------------------------------------"
echo ""

# Set the working directory to the project root
cd "$(dirname "$0")/.."

chmod a+x bin/*

# Display current working directory
echo "Current working directory (should end with '/pal-dash'): $(pwd)"

read -p "Do you want to continue? (y/n): " answer

# Check user's response
if [[ "$answer" != "y" && "$answer" != "Y" ]]; then
    echo "Build process aborted."
    exit 0
fi

# Generate startup.sh for pw-back
# Maybe this should be moved somewhere else
chmod a+x pw-back/bin/generate-startup-file.sh
pw-back/bin/generate-startup-file.sh

# Build all non-docker components (pw-back, pw-front)
bin/build-all.sh

# Generate the services and copy them to /etc/systemd/system/
bin/install-services.sh

# Install Paldex Dependency as a Docker Image
bin/paldex-setup.sh

echo "INSTALLATION COMPLETE"
echo "PalDash should be available via localhost:3000"
