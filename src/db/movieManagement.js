export const allMovies = () => ({
  text: 'SELECT * FROM "movies"',
})

export const allUPCs = () => ({
  text: 'SELECT upc FROM "movies"',
})

export const getMovieRow = upc => ({
  text: 'SELECT * FROM "movies" WHERE upc = ($1)',
  values: [ upc ],
})

export const createMovie = (upc, title, poster, copies) => ({
  text: 'INSERT INTO movies (upc, title, poster_loc, copies) VALUES (($1), ($2), ($3), ($4))',
  values: [ upc, title, poster, copies ],
})

export const editMovie = (upc, title, poster, copies) => ({
  text: 'UPDATE users SET title = ($2), poster_loc = ($3), copies = ($4) WHERE upc = ($1)',
  values: [ upc, title, poster, copies ],
})
