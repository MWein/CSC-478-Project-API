export const allMovies = () => ({
  text: 'SELECT * FROM "movies"',
})

export const allUPCs = () => ({
  text: 'SELECT upc FROM "movies"',
})

export const getMovieRowUPC = upc => ({
  text: 'SELECT * FROM "movies" WHERE upc = ($1)',
  values: [ upc ],
})

export const getMovieRowTitle = title => ({
  text: 'SELECT * FROM "movies" WHERE title = ($1)',
  values: [ title ],
})

export const createMovie = (upc, title, poster) => ({
  text: 'INSERT INTO movies (upc, title, poster) VALUES (($1), ($2), ($3)',
  values: [ upc, title, poster ],
})

export const editMovie = (upc, title, poster) => ({
  text: 'UPDATE users SET title = ($2), poster = ($3) WHERE upc = ($1)',
  values: [ upc, title, poster ],
})
