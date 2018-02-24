export const checkUsersTable = () => ({
  text: 'SELECT count(*) FROM users',
})
export const createUsersTable = () => ({
  text: `CREATE TABLE users (
    id          text NOT NULL,
    f_name      text,
    l_name      text,
    pin         text,
    token       text,
    timestamp   text,
    role        text,
    active      boolean,
    question    text,
    answer      text,
    phone       text,
    address     text,
    PRIMARY KEY(id)
  )`,
})

export const checkCustomersTable = () => ({
  text: 'SELECT count(*) FROM customers',
})
export const createCustomersTable = () => ({
  text: `CREATE TABLE customers (
    id          text NOT NULL,
    f_name      text,
    l_name      text,
    phone       text,
    address     text,
    active      boolean,
    email       text,
    PRIMARY KEY(id)
  )`,
})

export const checkMoviesTable = () => ({
  text: 'SELECT count(*) FROM movies',
})
export const createMoviesTable = () => ({
  text: `CREATE TABLE movies (
    upc          text NOT NULL,
    title        text,
    poster       text,
    PRIMARY KEY(upc)
  )`,
})

export const checkMovieCopiesTable = () => ({
  text: 'SELECT count(*) FROM movie_copies',
})
export const createMovieCopiesTable = () => ({
  text: `CREATE TABLE movie_copies (
    id           text NOT NULL,
    upc          text,
    PRIMARY KEY(id)
  )`,
})
