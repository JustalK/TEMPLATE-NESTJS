# TEMPLATE-NESTJS

This project is my template using NestJS.

Few routes has already been defined, the project has already a system of authentication using Passport.

## Installation

1. Create the project

```
$nest new <project-name>
```

2. Change few command in the package.json

3. Install mongoose

```
$npm install --save @nestjs/mongoose mongoose
```

Then import the module inside the *app.module.ts* with :

```
MongooseModule.forRoot('mongodb://<username>:<password>@<url>:<port>/<database>')
```

4. Adding environment file

```
$npm i --save @nestjs/config
```

```
ConfigModule.forRoot({
  envFilePath: ['.env.development.local', '.env.development'],
  isGlobal: true
}),
```

https://github.com/joeygoksu/prime-nestjs
https://javascript.plainenglish.io/graphql-nodejs-mongodb-made-easy-with-nestjs-and-mongoose-29f9c0ea7e1d
