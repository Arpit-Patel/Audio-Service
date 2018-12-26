FROM ubuntu:14.04

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ADD package*.json ./

# Update package list
RUN add-apt-repository ppa:mc3man/trusty-media
RUN apt-get update -y
RUN apt-get dist-upgrade -y

# Update packages
RUN apt-get update -y

# Install ffmpeg
RUN apt-get install -y ffmpeg

# Install youtube-dl
RUN apt-get install -y youtube-dl

RUN npm install 
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
ADD . .

EXPOSE 3000
CMD [ "npm", "start" ]