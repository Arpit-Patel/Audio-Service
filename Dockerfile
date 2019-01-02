FROM ubuntu:14.04

MAINTAINER Arpit Patel <a285pate@uwaterloo.ca>

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Update packages
RUN sudo apt-get update -y

# Update package list
RUN sudo apt-get install -y software-properties-common
RUN sudo add-apt-repository -y ppa:mc3man/trusty-media
RUN sudo apt-get update -y
RUN sudo apt-get dist-upgrade -y

# Install ffmpeg
RUN sudo apt-get install -y ffmpeg

# Install youtube-dl
RUN sudo apt-get install -y youtube-dl

# Install Node.js
RUN sudo apt-get install -y curl
RUN sudo curl --silent --location https://deb.nodesource.com/setup_10.x | sudo bash -
RUN sudo apt-get install -y nodejs
RUN sudo apt-get install -y build-essential

# Bundle app source
COPY . .

RUN sudo npm install
# If you are building your code for production
# RUN npm install --only=production

EXPOSE 8080
CMD [ "npm", "start" ]