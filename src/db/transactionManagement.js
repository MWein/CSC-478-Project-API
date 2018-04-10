export const createTransaction = (customerID, copyID, dueDate) => ({
  text: 'INSERT INTO transactions VALUES (($1), ($2), ($3), ($4))',
  values: [ customerID, copyID, dueDate, false ],
})
