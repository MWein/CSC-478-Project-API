# API Documentation - Movie Management

## **Description of overall system**: These endpoints are used for management of Lackluster Video movies.

## **Movie Database Schema**:
```javascript
{
  upc: 'Unique product code',
  title: 'Movie title',
  poster_loc: 'URL to a poster image on IMDB',
  copies: 'Array of movie copy IDs',
}
```

---

## **/imdbSearch**

**Protocol**: POST

**Description**: Integration with IMDB. Returns an array of movies with movie title, year, and a link to the poster.

**Permissions**: Admin, Manager, Employee

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
  searchStr: 'Star Wars',
}
```

**Sample Output**:
```javascript
{
  data: [
    {
      title: 'Solo: A Star Wars Story',
      year: 2018,
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjAwNzI3OTA5MV5BMl5BanBnXkFtZTgwMzc0MDE4NDM@._V1_.jpg',
      },
    ],
    error: false,
    errorMsg: '',
  }
```

---

## **/createMovie**

**Protocol**: POST

**Description**: Creates a movie in the database

**Permissions**: Admin, Manager, Employee

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
  upc: '123456',
  poster_loc: 'http://www.imdb.com/somePoster', // Optional, default = ''
  copies: [
    'dkfasdkf',
    'safdlkjasdfd',
  ], // Optional, default = [], must be an array of strings
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

## **/allMovies**

**Protocol**: POST

**Description**: Returns an array of movies filtered by upc and title. If upc and title are not passed, all movies in the database are returned. It is recommended that upc or title are sent, but not both.

**Permissions**: Admin, Manager, Employee

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
  upc: '123456',
  title: 'Fast and Furious 45',
}
```

**Sample Output**:
```javascript
{
  numRows: 1,
  rows: [
    {
      upc: '123456',
      title: 'Fast and Furious 45',
      poster_loc: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjAwNzI3OTA5MV5BMl5BanBnXkFtZTgwMzc0MDE4NDM@._V1_.jpg',
      copies: [
        'asdfasdf',
        'dfhhjssa',
      ]
    }
  ]
  error: false,
  errorMsg: '',
}
```

---

## **/editMovie**

**Protocol**: POST

**Description**: Edits information about the movie in the database.
<br />*Note*: Values not included in the request body will not be changed.

**Permissions**: Admin, Manager, Employee

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
  upc: '123456', // Optional
  title: 'Fast and Furious 45', // Optional
  copies: [
    'fdkjsdlkjsdf',
    'adgadfgsdfg',
  ], // Optional
}
```

**Sample Output**:
```javascript
{
  token: 'asdfasdf',
  upc: '123456',
  title: 'Fast and Furious 45',
  copies: [
    'fdkjsdlkjsdf',
    'adgadfgsdfg',
  ],
  error: false,
  errorMsg: '',
}
```

---

## **/lookupCopyId**

**Protocol**: POST

**Description**: Returns an array of movies with a matching copy ID.

**Permissions**: Admin, Manager, Employee

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
  copy: 'fdkjsdlkjsdf',
}
```

**Sample Output**:
```javascript
{
  movies: [
    {
      upc: '123456',
      title: 'Fast and Furious 45',
      copies: [
        'fdkjsdlkjsdf',
        'adgadfgsdfg',
      ],
    },
  ]
  error: false,
  errorMsg: '',
}
```
