CREATE TABLE users (
                       id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
                       username VARCHAR(128) NOT NULL UNIQUE,
                       password VARCHAR(128) NOT NULL,
                       email VARCHAR(128) NOT NULL UNIQUE,
                       first_name VARCHAR(128) NOT NULL,
                       last_name VARCHAR(128) NOT NULL
);

-- Adding indexes
CREATE INDEX idx_first_name ON users(first_name);
CREATE INDEX idx_last_name ON users(last_name);
CREATE INDEX idx_password ON users(password);
CREATE INDEX idx_email ON users(email);


CREATE TABLE blog_post (
                           id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
                           user_id VARCHAR(60) NOT NULL,  -- Foreign key to the 'users' table
                           title VARCHAR(255) NOT NULL,
                           content TEXT NOT NULL,
                           picture VARCHAR(256) DEFAULT 'default_post.jpg',
                           category VARCHAR(50) DEFAULT 'Miscellaneous',

    -- Define the foreign key constraint
                           CONSTRAINT fk_user FOREIGN KEY (user_id)
                               REFERENCES users(id) ON DELETE CASCADE
);

-- Adding indexes
CREATE INDEX idx_user_id ON blog_post(user_id);
CREATE INDEX idx_title ON blog_post(title);
CREATE INDEX idx_category ON blog_post(category);
