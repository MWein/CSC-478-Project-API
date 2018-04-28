# API Documentation - Transaction Management

## **Description of overall system**: These endpoints are used for management of Lackluster Video rentals and returns.

---

## **/returnMovie**

**Protocol**: POST

**Description**: Sets the status of the given transactions to returned in the database. Returns all open transactions aside from the ones returned through this endpoint.

**Permissions**: Manager, Employee

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
  copyIDs: [
    'someCopyID',
    'someOtherCopyID',
  ]
}
```

**Sample Output**:
```javascript
[
  {
    address: '',
    copyID: 'overdueCopyID',
    customerID: '123456',
    dueDate: '2018-04-28T05:00:00.000Z',
    email: 'someEmail@email.com',
    f_name: 'Brad',
    l_name: 'Grimshaw',
    phone: '1234567890',
    returned: false,
    title: 'Lord of the Flies',
  },
]
```

---

## **/createTransaction**

**Protocol**: POST

**Description**: Creates a new transaction in the database using the provided customer unique ID and unique copy IDs.

**Permissions**: Manager, Employee

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
  customerID: '123456'
  copyIDs: [
    'someCopyID',
    'someOtherCopyID',
  ]
}
```

**Sample Output**:
```javascript
{
  error: false,
  errorMsg: '',
}
```

---

## **/openTransactions**

**Protocol**: POST

**Description**: Returns a list of transactions that are rented out but not yet returned.

**Permissions**: Manager, Employee

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
}
```

**Sample Output**:
```javascript
{
  rows: [
    {
      address: '',
      copyID: 'overdueCopyID',
      customerID: '123456',
      dueDate: '2018-04-28T05:00:00.000Z',
      email: 'someEmail@email.com',
      f_name: 'Brad',
      l_name: 'Grimshaw',
      phone: '1234567890',
      returned: false,
      title: 'Lord of the Flies',
    },
  ],
  error: false,
  errorMsg: '',
}
```

---

## **/bestMovies**

**Protocol**: POST

**Description**: Returns a sorted list of the ten most popular movies.

**Permissions**: Manager

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
}
```

**Sample Output**:
```javascript
[
  {
    title: ".hack//ROOTS (Bandai Entertainment) #3 (Special Edition w/ MP3 Case)",
    upc: "669198222528",
    order_count: "4"
  },
  {
    title: ".Com For Murder",
    upc: "14381411928",
    order_count: "3"
  },
]
```

## **/bestCustomers**

**Protocol**: POST

**Description**: Returns a sorted list of the ten most active customers.

**Permissions**: Manager

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
}
```

**Sample Output**:
```javascript
[
  {
    customerID: "yuxourmrmr","f_name":"Brad","l_name":"Grimshaw",
    order_count: "8"
  },
  {
    customerID: "yflsmdehob","f_name":"Mike","l_name":"Weinberg",
    order_count: "7"
  },
  {
    customerID: "voyuylgggb","f_name":"Jack","l_name":"Black",
    order_count: "7"
  },
]
```
