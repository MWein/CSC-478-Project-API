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

export const createCustomersTable = () => ({
  text: `CREATE TABLE customers (
    id          text NOT NULL,
    f_name      text,
    l_name      text,
    phone       text,
    address     text,
    active      text,
    email       text,
    PRIMARY KEY(id)
  )`,
})

export const createMoviesTable = () => ({
  text: `CREATE TABLE movies (
    upc          text NOT NULL,
    title        text,
    poster_loc   text,
    copies       text,
    PRIMARY KEY(upc)
  )`,
})
