# API Documentation
---

## **/status**

**Protocol**: GET

**Description**: Retuns 'ok' to verify that the server is listening

**Permissions**: Everyone

**Sample Input**: N/A

**Sample Output**:
```javascript
'ok'
```

---

## **/login**

**Protocol**: POST

**Description**: Given a proper ID and pin, logs the user in and returns the user information in JSON format. Includes a token which will be used for permission calls.

**Permissions**: Everyone

**Sample Input**:
```javascript
{
  id: 'superuser'
  pin: 'soMep@sSw0rd'
}
```

**Sample Output**:
```javascript
{
  id: 'superuser',
  f_name: '',
  l_name: '',
  role: 'admin',
  token: 'fxxatvpeoy',
  error: false,
  errorMsg: ''
}
```


## **/logout**

**Protocol**: POST

**Description**: Logs the user out and clears the bearer token from the database.

**Permissions**: Everyone

**Sample Input**:
```javascript
{
  id: 'superuser'
}
```

**Sample Output**:
```javascript
'success'
```

---

## **/allUsers**

**Protocol**: POST

**Description**: Returns a list of all users in the database. Passwords, tokens, and timestamps are not returned for security purposes.

**Permissions**: Admin

**Sample Input**:
```javascript
{
  token: 'gsmckcksla;'
}
```

**Sample Output**:
```javascript
{
  numRows: 2,
  rows: [
    {
      id: 'superuser',
      f_name: '',
      l_name: '',
      role: 'admin'
    },
  ],
  error: false,
  errorMsg: null
}
```

---

## **/createUser**

**Protocol**: POST

**Description**: Adds a new user to the database.

**Permissions**: Admin

**Sample Input**:
```javascript
{
  token: 'sdfakdfglkadf',
  newID: 'mwein3',
  newPin: '0123',
  newRole: 'admin',
  newFName: 'Mike',
  newLName: 'Weinberg',
}
```

**Sample Output**:
```javascript
{
  error: false,
  errorMsg: ''
}
```

---

## **/deleteUser**

**Protocol**: POST

**Description**: Removes a user from the database.

**Permissions**: Admin

**Sample Input**:
```javascript
{
  token: 'sdfakdfglkadf',
  doomedId: 'mwein3',
}
```

**Sample Output**:
```javascript
'success'
```