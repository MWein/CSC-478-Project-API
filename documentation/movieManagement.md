# API Documentation - Movie Management

## **Description of overall system**: These endpoints are used for management of Lackluster Video movies.

## **Movie Database Schema**:
```javascript
{
  upc: 'Unique product code',
  title: 'Movie title',
  poster: 'URL to a poster image on IMDB',
}
```

## **Movie Copy Database Schema**:
```javascript
{
  id: 'asdfasdfasdf',
  upc: 'dfdfdfasdfs',
  active: true,
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

**Description**: Creates a movie and its copies in the database

**Permissions**: Admin, Manager, Employee

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
  upc: '123456',
  poster: 'http://www.imdb.com/somePoster', // Optional, default = ''
  copies: [
    'asdfasdf',
    'fjfjdhss',
  ] // Optional, default = []
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

## **/getMovie**

**Protocol**: POST

**Description**: Returns an array of movies filtered by upc and title. If upc and title are not passed, an error is returned. If UPC and Title are sent, UPC will be used. If ecludeInactive is true, inactive copies will not be returned.

**Permissions**: Admin, Manager, Employee

**Sample Input**:
```javascript
{
  token: 'asdfasdf',
  upc: '123456', // Optional
  title: 'Fast and Furious 45', // Optional
  excludeInactive: false // Optional, default = true
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
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjAwNzI3OTA5MV5BMl5BanBnXkFtZTgwMzc0MDE4NDM@._V1_.jpg',
      copies: [
        'fffffff',
        'trrskdlf',
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
}
```

**Sample Output**:
```javascript
{
  token: 'asdfasdf',
  upc: '123456',
  title: 'Fast and Furious 45',
  error: false,
  errorMsg: '',
}
```
