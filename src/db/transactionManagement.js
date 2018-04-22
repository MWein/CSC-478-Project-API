export const createTransaction = (customerID, copyID, dueDate) => ({
  text: 'INSERT INTO transactions VALUES (($1), ($2), ($3), ($4))',
  values: [ customerID, copyID, dueDate, false ],
})

export const openTransactions = () => ({
  text: 'SELECT "customerID", "copyID", "dueDate", returned, f_name, l_name, phone, address, email, title FROM transactions JOIN customers ON transactions."customerID"=customers.id JOIN movie_copies ON transactions."copyID"=movie_copies.id JOIN movies ON movie_copies.upc=movies.upc WHERE returned=false',
})

export const bestCustomers = limit => ({
  text: 'SELECT "customerID", f_name, l_name, COUNT("customerID") AS order_count FROM transactions JOIN customers ON transactions."customerID"=customers.id GROUP BY "customerID", f_name, l_name ORDER BY order_count DESC LIMIT ($1)',
  values: [ limit ],
})

export const bestMovies = limit => ({
  text: 'SELECT title, movie_copies.upc, COUNT(movie_copies.upc) AS order_count FROM transactions JOIN movie_copies ON transactions."copyID"=movie_copies.id JOIN movies ON movie_copies.upc=movies.upc GROUP BY title, movie_copies.upc ORDER BY order_count DESC LIMIT ($1)',
  values: [ limit ],
})
