require('dotenv').config();

const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');

server.use(session({
   secret: process.env.SECRET_KEY,
   saveUninitialized: false,
   resave: false,
   cookie: { maxAge: 60 * 60 * 1000 },
}));

server.use(express.json());

const connectDB = require('./helpers/db');

connectDB();

server.use('/posts', require('./routes/posts'));
server.use('/users', require('./routes/users'));

server.listen(PORT, () => {
   console.log(`Server started on http://localhost:${PORT}`);
});

// TODO implement JWT and/or express-session