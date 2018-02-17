# This script is placed in the desktop of the servers
# It will git pull the project, this script included
# and start the server in prod or nonprod, depending
# on the host name

echo ""
echo "   Copyright (C) 2018 Hex"
echo ""

cd ..
cd server
cd csc-478-project-api

echo "Updating project from Git"
git pull

echo ""
echo "Installing packages from NPM, this may take a moment"
npm install

clear

echo ""
echo "#####################################"
echo "# WARNING: DO NOT CLOSE THIS WINDOW #"
echo "#####################################"

echo ""
echo "To stop the server properly, ctrl + c"
echo "Closing this window will not stop the server"
echo "The port will be blocked and a restart will be necessary if you do"
echo "Thank you, have a nice day"


host=$(hostname)

if [ "$host" == "CSC478Team301" ]; then
  npm run dev
fi

if [ "$host" == "CSC478Team302" ]; then
  npm run prod
fi
