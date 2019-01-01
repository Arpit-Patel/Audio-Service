FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ADD package*.json ./

# Update package list
RUN sudo apt-get install -y software-properties-common
RUN sudo add-apt-repository -y ppa:mc3man/trusty-media
RUN sudo apt-get update -y
RUN sudo apt-get dist-upgrade -y

# Update packages
RUN sudo apt-get update -y

# Install ffmpeg
RUN sudo apt-get install -y ffmpeg

# Install youtube-dl
RUN sudo apt-get install -y youtube-dl

RUN sudo apt-get install -y npm

RUN sudo npm install 
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
ADD . .

EXPOSE 8080
CMD [ "npm", "start" ]