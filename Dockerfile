FROM node:10

# Create app directory
WORKDIR '/var/www/app'

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g webpack webpack-cli

# Bundle app source
COPY . .

# Build
RUN NODE_ENV=production webpack --progress --hide-modules

# Run app
EXPOSE 4244
CMD [ "node", "server.js" ]
