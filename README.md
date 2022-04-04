# TEMPLATE-DOCKER-NGINX

## Description

This template is useful for starting a new docker project with a docker-compose having 3 services :

- **nginx**: for the reverse proxy using the `jwilder` image from Docker
- **mongodb**: for using it has a fresh database using the latest image of `mongo`
- **server1**: for a small start project using `Express`

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

## Links

- [https://www.compose.com/articles/why-and-how-to-redis-with-your-mongodb/](https://www.compose.com/articles/why-and-how-to-redis-with-your-mongodb/)
