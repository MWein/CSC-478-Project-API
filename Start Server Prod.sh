echo ""
echo "   Copyright (C) 2018 Hex"

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

npm run prod
