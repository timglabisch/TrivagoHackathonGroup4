#!/bin/bash

if [ ! `node -v` ]
then
    mkdir -p /tmp/node
    cd /tmp/node

    apt-get update
    apt-get install -y python g++ make checkinstall
    wget -N http://nodejs.org/dist/node-latest.tar.gz
    tar xzf node-latest.tar.gz && cd node-v*
    ./configure
    make
    make install

    cd ~
fi


if [ ! `whereis coffee | grep coffee` ]
then
    sudo npm install -g coffee-script
fi

echo ""
echo "ready !!"
echo ""

node -v

echo "----------- START PROVISIONING -------------"

cd /opt/foo
npm install