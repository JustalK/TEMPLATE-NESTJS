db.createUser({
  user: 'admin',
  pwd: 'test',
  roles: [
    {
      role: 'readWrite',
      db: 'admin',
    },
  ],
});
db.createCollection('test');
db.createCollection('users');
db.users.insertMany([
  {
    username: 'kevin',
    password: 'test',
  },
]);
