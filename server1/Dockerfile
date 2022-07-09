FROM node:alpine

# Get variables from docker-compose
ARG ENVIRONMENT
RUN echo "ENVIRONMENT: ${ENVIRONMENT}"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependancies
COPY ["package.json", "package-lock.json*", "./"]
COPY ./env/dev-startup.sh /
COPY ./env/prod-startup.sh /
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

# RUN if [ "$ENVIRONMENT" = "DEV" ] ; then \
#    CMD [ "npm", "run", "dev" ]; \
#  else \
#    CMD [ "npm", "run", "build" ] && \
#    CMD [ "npm", "run", "start:prod" ]; \
# fi
