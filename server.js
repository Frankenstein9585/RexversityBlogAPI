require('dotenv').config();

const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());

server.use('/posts', require('./routes/posts'));
server.use('/users', require('./routes/users'));

server.listen(PORT, () => {
   console.log(`Server started on http://localhost:${PORT}`);
});
