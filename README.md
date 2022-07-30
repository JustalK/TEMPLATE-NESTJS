# TEMPLATE-NESTJS

## Description

This template is an example of what is a good starter for a nestjs project with a system of authentification.

## Features

- **Docker-compose environments**: Using the command of the package.json, two environments for `docker-compose` has been created. There are located in the env folder at the root of the project.
- **Reverse proxy**: With the jwilder, a simple configuration of the url has been implemented and can be found in the env files under the `VIRTUAL_HOST` and `VIRTUAL_PORT` configuration.
- **Refresh token**: A refresh token has been implemented to give the frontend ability to refresh the access token
- **healthcheck**: The healthcheck has been implement on every container
- **Quality of code**: For checking the quality of the code, `Sonar` has been configured and linked to the test and coverage
- **Initialization of mongodb**: A script has been implemented for initializing mongodb upon creation with some data such the admin user.
- **In memory database**: For improving the speed of the test's execution, the database has been connected to `mongodb-memory-server`
- **Absolute Path**: Relative path at more than one level has been removed using module-alias for writting only absolute path
- **Javascript Typing**: The entire code has been typed using `typescript`
- **Javascript Typing Coverage**: The coverage of the typing of the element is checked using `typescript-coverage-report`

## Docker-compose

```bash
$ docker-compose down
$ docker-compose up -d --build
```

The command has been added in the package.json, so it can also be start and stop with :

```bash
$ npm run start
$ npm run stop
```

## Nginx

#### Description

Using `jwilder/nginx-proxy` for creating proxy on server by reading the services in dockercompose.

You can connect to the different server using those url:

- **server1**: api.server1.net

#### Adding new proxy

For adding a new proxy, be sure to do those two step:

1. Give the two environment variables `VIRTUAL_HOST` and `VIRTUAL_PORT` in the docker-compose to the services you want to proxy.
2. Create a line in the host file with the following command:

```
$ sudo nano /etc/host
```

Then add the following line:

```
127.0.0.1 api.server1.net api.server2.net api.server3.net
```

## Mongodb

The init file in the `mongodb/init` folder with be use for initializing the admin authentication in the server3. In case, it does not work, look in `lazydocker`.

If you dont find the reason, delete the container with the volume and delete the folder `mongodb/data` using sudo rm -rf command.

## Checking

A good way to test if service are up is by using the ping command.
By example, you could check if the server2 is up with this command :

```
$ ping api.server2.net
```

mongo "mongodb://admin:test@localhost:28017/test?authSource=admin"

## Links

- [https://www.compose.com/articles/why-and-how-to-redis-with-your-mongodb/](https://www.compose.com/articles/why-and-how-to-redis-with-your-mongodb/)
