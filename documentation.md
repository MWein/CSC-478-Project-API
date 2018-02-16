# API Documentation

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
  id: 'superuser',
  pin: 'soMep@sSw0rd',
}
```

**Sample Output**:
```javascript
{
  id: '0123',
  f_name: 'Mike',
  l_name: 'Weinberg',
  role: 'admin',
  token: 'fxxatvpeoy',
  error: false,
  errorMsg: '',
}
```


## **/logout**

**Protocol**: POST

**Description**: Logs the user out and clears the bearer token from the database.

**Permissions**: Everyone

**Sample Input**:
```javascript
{
  id: 'superuser',
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

## **/allUsers**

**Protocol**: POST

**Description**: Returns a list of all users in the database. Passwords, tokens, and timestamps are not returned for security purposes.

**Permissions**: Admin

**Sample Input**:
```javascript
{
  token: 'gsmckcksla;'
  excludeInactive: false, // Optional, default = true
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
      active: true,
    },
    {
      id: '0123',
      f_name: 'Brad',
      l_name: 'Grimshaw',
      role: 'admin',
      active: false,
    },
  ],
  error: false,
  errorMsg: '',
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
  newFName: 'Mike', // Optional, default = ''
  newLName: 'Weinberg', // Optional, default = ''
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

## **/setUserActive**

**Protocol**: POST

**Description**: Activates or deactivates a user.

**Permissions**: Admin

**Sample Input**:
```javascript
{
  token: 'gsmckcksla;',
  id: '0123',
  active: false,
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

## **/setUserRole**

**Protocol**: POST

**Description**: Sets the role of a user.

**Permissions**: Admin

**Sample Input**:
```javascript
{
  token: 'gsmckcksla;',
  id: '0123',
  role: 'admin',
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

## **/signedInUsers**

**Protocol**: POST

**Description**: Returns information for all users currently logged in based on timestamp and whether or not they have a key.

**Permissions**: Admin

**Sample Input**:
```javascript
{
  token: 'gsmckcksla;',
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
    {
      id: '0123',
      f_name: 'Brad',
      l_name: 'Grimshaw',
      role: 'admin',
    },
  ],
  error: false,
  errorMsg: '',
}
```