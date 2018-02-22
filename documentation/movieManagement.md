# API Documentation - Movie Management

## **Description of overall system**: These endpoints are used for management of Lackluster Video movies.

## **Movie Database Schema**:
```javascript
{
  upc: 'Unique product code',
  title: 'Movie title',
  poster_loc: 'URL to a poster image on IMDB',
  copies: 'A "stringified" Javascript array of movie copy IDs',
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
