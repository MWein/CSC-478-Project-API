# API Documentation - Overall System

## **Input Values**:

### Most API endpoints use the POST protocol. This means that all input information must be stored in the ```body``` of the http call.
```javascript
{
  body: {
    id: 'mwein3',
    pin: 'p@ssw0rd',
  }
}
```

### The API takes request encoded using ```x-www-form-urlencoded```. Any requests not using this protocol will return errors.


---

## **Return Values**:

### Most system return values follow these general rules. If an operation is successful, most returns will look like the following,
```javascript
{
  error: false,
  errorMsg: '',
}
```

### Some endpoints return database information. Most return values will look like the following,
```javascript
{
  numRows: 2,
  rows: [
    {
      f_name: 'Jack',
      l_name: 'Bower',
    },
    {
      f_name: 'Santa',
      l_name: 'Clause',
    }
  ]
  error: false,
  errorMsg: '',
}
```

### If, however, an operation is unsuccessful, return values will always look like the following,
```javascript
{
  error: true,
  errorMsg: 'Invalid credentials',
}
```

### All API operations will return a JSON object with ```error``` and ```errorMsg```. It is important to ensure that ```error``` is set to ```false``` prior to retrieving any other information from the resulting JSON object. This will remove the need to use try, catch blocks and add stability to the system.