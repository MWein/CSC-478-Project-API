export const allCustomers = () => ({
  text: 'SELECT * FROM "customers"',
})

export const customerById = id => ({
  text: 'SELECT * FROM "customers" WHERE id = ($1)',
  values: [ id ],
})

export const editCustomer = (id, f_name, l_name, phone, address, active, email) => ({
  text: 'UPDATE customers SET f_name = ($2), l_name = ($3), phone = ($4), address = ($5), active = ($6), email = ($7) WHERE id = ($1)',
  values: [ id, f_name, l_name, phone, address, active, email ],
})
