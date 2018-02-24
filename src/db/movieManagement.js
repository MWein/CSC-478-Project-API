export const allMovies = () => ({
  text: 'SELECT * FROM "movies"',
})

export const allUPCs = () => ({
  text: 'SELECT upc FROM "movies"',
})

export const allUPCAndCopyIds = () => ({
  text: 'SELECT id, upc FROM "movie_copies"',
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
  text: 'INSERT INTO movies (upc, title, poster) VALUES (($1), ($2), ($3))',
  values: [ upc, title, poster ],
})

export const editMovie = (upc, title, poster) => ({
  text: 'UPDATE movies SET title = ($2), poster = ($3) WHERE upc = ($1)',
  values: [ upc, title, poster ],
})

export const createMovieCopy = (id, upc, active) => ({
  text: 'INSERT INTO movie_copies (id, upc, active) VALUES (($1), ($2), ($3))',
  values: [ id, upc, active ],
})

export const getMovieCopiesUPC = upc => ({
  text: 'SELECT * FROM movie_copies WHERE upc = ($1)',
  values: [ upc ],
})
