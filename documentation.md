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

**Description**: Given a proper ID and pin or security question answer, logs the user in and returns the user information in JSON format. Includes a token which will be used for permission calls.
<br />*Note*: pin and answer are both declared optional however at least one must be passed.
<br />*Note*: Will return needsSecurityQuestion. If true is returned, user should be prompted to create a security question for password recovery.

**Permissions**: Everyone

**Sample Input**:
```javascript
{
  id: 'superuser',
  pin: 'soMep@sSw0rd', // Optional
  answer: 'May', // Optional
}
```

**Sample Output**:
```javascript
{
  id: "superuser",
  f_name: "",
  l_name: "",
  role: "admin",
  token: "wrrliibrja",
  needsSecurityQuestion: false,
  error: false,
  errorMsg: ""
}
```

---

## **/logout**

**Protocol**: POST

**Description**: Logs the user out and clears the bearer token from the database.

**Permissions**: Logged in user

**Sample Input**:
```javascript
{
  token: 'lkjdfa;lkdf',
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

**Description**: Returns a list of all users in the database. Passwords and tokens are not returned for security purposes.

excludeInactive: If set to true, only active users will be returned.
signedIn: If set to false, all users will be returned. If true, only signed in users will be returned.
<br />*Note*: Timestamp is the time of the last action performed by the user. The user is automatically logged out after 15 minutes of inactivity.

**Permissions**: Admin

**Sample Input**:
```javascript
{
  token: 'gsmckcksla;'
  excludeInactive: false, // Optional, default = true
  signedIn: true, // Optional, default = false
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
      phone: '1234',
      address: '123 Fake Street',
      timestamp: '2018-02-17T21:28:35.154-06:00',
    },
    {
      id: '0123',
      f_name: 'Brad',
      l_name: 'Grimshaw',
      role: 'admin',
      active: false,
      phone: '555-0123',
      address: '123 Elm Street',
      timestamp: '2018-02-17T21:28:35.154-06:00',
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
  id: 'mwein3',
  pin: '0123',
  role: 'admin',
  f_name: 'Mike', // Optional, default = ''
  l_name: 'Weinberg', // Optional, default = ''
  phone: '123456', // Optional, default = ''
  address: '5678 3rd Street', // Optional, default = ''
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

## **/editUser**

**Protocol**: POST

**Description**: Edits information about the user in the database.
<br />*Note*: Values not included in the request body will not be changed.

**Permissions**: Admin

**Sample Input**:
```javascript
{
  token: 'sdfakdfglkadf',
  id: 'mwein3',
  f_name: 'Mike', // Optional
  l_name: 'Weinberg', // Optional
  role: 'admin', // Optional
  active: false, // Optional
  phone: '867-5309', // Optional
  address: '123 Fake Street', // Optional
}
```

**Sample Output**:
```javascript
{
  id: 'mwein3',
  f_name: 'Mike',
  l_name: 'Weinberg',
  role: 'admin',
  active: false,
  phone: '867-5309',
  address: '123 Fake Street',
  error: false,
  errorMsg: ''
}
```

---

## **/adminSetPassword**

**Protocol**: POST

**Description**: Password recovery method. Changes the password of a given user. 
<br />*Note*: This should only be used if /login using the security answer is unsuccessful.
<br />*Note*: This is a method for a user with admin permissions to change the password of another user. This is not for a user to set their own password. /setPassword is used for that.

**Permissions**: Admin

**Sample Input**:
```javascript
{
  token: 'sdfakdfglkadf',
  id: 'mwein3',
  pin: '123NewPassword',
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

## **/setPassword**

**Protocol**: POST

**Description**: Changes the password of the loggin in user.

**Permissions**: Logged in user

**Sample Input**:
```javascript
{
  token: 'sdfakdfglkadf',
  pin: '123NewPassword',
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

## **/getSecurityQuestion**

**Protocol**: POST

**Description**: Returns the security question of a given user.

**Permissions**: Everyone

**Sample Input**:
```javascript
{
  id: 'mawein3',
}
```

**Sample Output**:
```javascript
{
  question: 'First car?',
  error: false,
  errorMsg: ''
}
```

---

## **/setSecurityQuestion**

**Protocol**: POST

**Description**: Sets the security question and answer for the logged in user.

**Permissions**: Logged in user

**Sample Input**:
```javascript
{
  question: 'First car?',
  answer: 'A sedan',
}
```

**Sample Output**:
```javascript
{
  error: false,
  errorMsg: ''
}
```