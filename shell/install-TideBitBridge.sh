#!/bin/bash

###
### Install and Run Service
###

### Clone Project
cd ~
mkdir workspace
cd workspace
git clone https://github.com/BOLT-Protocol/TideBitBridge

### Build Service
cd TideBitBridge
npm i

### Start Service
pm2 start . --name TideBit Bridge
echo "pm2 start . --name TideBit Bridge" | sudo tee -a /etc/fstab
