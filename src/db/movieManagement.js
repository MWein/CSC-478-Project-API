export const countUPC = upc => ({
  text: 'SELECT count(*) FROM movies WHERE upc = ($1)',
  values: [ upc ],
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

export const getCopyRow = id => ({
  text: 'SELECT * FROM movie_copies WHERE id = ($1)',
  values: [ id ],
})

export const returnMovieCopy = id => ({
  text: 'UPDATE transactions SET returned = true WHERE "copyID"=($1)',
  values: [ id ],
})
