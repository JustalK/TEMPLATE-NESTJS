FROM node:alpine

# Get variables from docker-compose
ARG ENVIRONMENT
RUN echo "ENVIRONMENT: ${ENVIRONMENT}"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependancies
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

EXPOSE 3000

RUN if [ "$ENVIRONMENT" = "DEV" ] ; then \
    npm run dev \
  else \
    npm run build && npm run start:prod ; \
fi
