export const createTransaction = (customerID, copyID, dueDate) => ({
  text: 'INSERT INTO transactions VALUES (($1), ($2), ($3), ($4))',
  values: [ customerID, copyID, dueDate, false ],
})

export const openTransactions = () => ({
  text: 'SELECT "customerID", "copyID", "dueDate", returned, f_name, l_name, phone, address, email, title FROM transactions JOIN customers ON transactions."customerID"=customers.id JOIN movie_copies ON transactions."copyID"=movie_copies.id JOIN movies ON movie_copies.upc=movies.upc WHERE returned=false',
})
