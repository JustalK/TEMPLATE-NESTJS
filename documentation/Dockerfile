FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependancies
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "start" ]
