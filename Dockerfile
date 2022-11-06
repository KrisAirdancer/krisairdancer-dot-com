FROM node:16

# A directory to hold the application code inside the image, this will be the working directory for the application.
# This directory will be made inside the image.
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependencies
RUN npm install

# COPY specifies files to be included in the Docker Image when it is built. That is, it copies
# files from the machine building the Docker image and and places those copies into the Image.
# Put another way, this tells the Docker builder what files to include in the Docker Image.
COPY . .

EXPOSE 11001

CMD [ "node", "AirdancerServer.js" ]