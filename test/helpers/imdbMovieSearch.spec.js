import chai from 'chai'
import { deriveJsonFromIMDBResponse } from '../../src/helpers/imdbMovieSearch'

chai.use(require('sinon-chai'))
const expect = chai.expect


describe('imdbMovieSearch tests', () => {
  it('Responds properly to an empty IMDB return', async() => {
    const actual = await deriveJsonFromIMDBResponse('')

    expect(actual).to.deep.equal({ error: true, errorMsg: 'No response' })
  })

  it('Returns an empty array if no movies (features) are in the return', async() => {
    const imdbReturn = 'imdb$hayden({"v":1,"q":"hayden","d":[{"l":"Hayden Panettiere","id":"nm0659363","s":"Actress, Heroes (2006-2010)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BOTY2OTI1NzA0NV5BMl5BanBnXkFtZTcwOTczMTA2Mw@@._V1_.jpg",404,531]},{"l":"Hayden Christensen","id":"nm0159789","s":"Actor, Star Wars: Episode III - Revenge of the Sith (2005)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BY2Y2NTE4YzYtMTA4OS00NzNmLWIxNzctMDEyMjE2NWU3YWNmXkEyXkFqcGdeQXVyODMwMzI4MTg@._V1_.jpg",500,620]},{"l":"Hayden Byerly","id":"nm4114475","s":"Actor, The Fosters (2013-2018)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BYTIzNmYzMDItYTM1OS00ZTdjLTk5ZTctMmQxYWIwNTZiY2MxXkEyXkFqcGdeQXVyMjM1NDExMTM@._V1_.jpg",1463,2048]},{"l":"Sterling Hayden (I)","id":"nm0001330","s":"Actor, Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb (1964)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMjE0MTk1NjkzN15BMl5BanBnXkFtZTcwMzA1MjE1Mg@@._V1_.jpg",441,700]},{"l":"Jay Hayden (I)","id":"nm2632545","s":"Actor, Station 19 (2018)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMTgzMDQyOTYzMl5BMl5BanBnXkFtZTcwMjY5NjE0Nw@@._V1_.jpg",428,594]},{"l":"Hayden Szeto","id":"nm4861659","s":"Actor, The Edge of Seventeen (2016)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BODVlZDgxZDQtMGYxNy00ODE0LWIwYjUtZWFiYmUwYmZiMWI5XkEyXkFqcGdeQXVyMzA4MTc1MzA@._V1_.jpg",928,1400]},{"l":"Hayden Rorke","id":"nm0740718","s":"Actor, When Worlds Collide (1951)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMTM4ODQxOTU2M15BMl5BanBnXkFtZTcwNjIxOTgxOA@@._V1_.jpg",1353,2048]},{"l":"Hayden Panettiere: Fame","id":"tt5635596","s":"Hayden Panettiere, Hayden Panettiere","y":2013,"q":"video","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BZjFkODdkY2MtMDU2MC00OGIzLTkyNGItZTZjNDJkYWQ3M2I5XkEyXkFqcGdeQXVyMjgzMzAzMjE@._V1_.jpg",1204,1022]}]})'

    const actual = await deriveJsonFromIMDBResponse(imdbReturn)

    expect(actual).to.deep.equal({ data: [], error: false, errorMsg: '' })
  })

  it('Returns array of feature movies from a list excluding non-features and actors', async() => {
    const imdbReturn = 'imdb$jack({"v":1,"q":"jack","d":[{"l":"Jack Nicholson (I)","id":"nm0000197","s":"Actor, Chinatown (1974)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ3OTY0ODk0M15BMl5BanBnXkFtZTYwNzE4Njc4._V1_.jpg",289,400]},{"l":"Jack O\'Connell (IV)","id":"nm1925239","s":"Actor, Unbroken (2014)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMTU4MjU0NjI4NF5BMl5BanBnXkFtZTgwNjU3NTUzMDI@._V1_.jpg",973,1338]},{"l":"Jack Ryan","id":"tt5057054","s":"John Krasinski, Abbie Cornish","y":2018,"q":"TV series","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMjM2ODYyMDAxNV5BMl5BanBnXkFtZTgwODgwODk2NDM@._V1_.jpg",1382,2048]},{"l":"Jack Black (I)","id":"nm0085312","s":"Actor, The School of Rock (2003)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMjE2MjI4NTQxN15BMl5BanBnXkFtZTgwMDMyMDg4NTE@._V1_.jpg",807,1024]},{"l":"Jack Reacher","id":"tt0790724","s":"Tom Cruise, Rosamund Pike","y":2012,"q":"feature","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMTM1NjUxMDI3OV5BMl5BanBnXkFtZTcwNjg1ODM3OA@@._V1_.jpg",1392,2000]},{"l":"Jack Reacher: Never Go Back","id":"tt3393786","s":"Tom Cruise, Cobie Smulders","y":2016,"q":"video","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BODQ3ODQ3NDI4NV5BMl5BanBnXkFtZTgwMDY1Mzk5OTE@._V1_.jpg",960,1500]},{"l":"Jack Davenport (I)","id":"nm0202603","s":"Actor, Pirates of the Caribbean: Dead Man\'s Chest (2006)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMTMwNDI0MzgxOV5BMl5BanBnXkFtZTYwMTAwMDY0._V1_.jpg",271,400]},{"l":"Jack Huston","id":"nm1658935","s":"Actor, Kill Your Darlings (2013)","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMjM5NjU3Mzk0NV5BMl5BanBnXkFtZTgwNjU4MTU5ODE@._V1_.jpg",765,1106]}]})'

    const actual = await deriveJsonFromIMDBResponse(imdbReturn)
    const expected = {
      data: [
        {
          title: 'Jack Ryan',
          year: 2018,
          format: 'TV series',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjM2ODYyMDAxNV5BMl5BanBnXkFtZTgwODgwODk2NDM@._V1_.jpg',
        },
        {
          title: 'Jack Reacher',
          year: 2012,
          format: 'feature',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTM1NjUxMDI3OV5BMl5BanBnXkFtZTcwNjg1ODM3OA@@._V1_.jpg',
        },
      ],
      error: false,
      errorMsg: '',
    }

    expect(actual).to.deep.equal(expected)
  })

  it('Returns array of star wars movies from IMDB search', async() => {
    const imdbReturn = 'imdb$star_wars({"v":1,"q":"star_wars","d":[{"l":"Star Wars on IMDb","id":"/star-wars","s":"Your guide to the expanded Star Wars universe","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzMzM4NzkzOV5BMl5BanBnXkFtZTcwNjIyMTIyMw@@._CR302,100,957,1419_UX614_UY910.jpg"]},{"l":"Solo: A Star Wars Story","id":"tt3778644","s":"Alden Ehrenreich, Emilia Clarke","y":2018,"q":"feature","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMjAwNzI3OTA5MV5BMl5BanBnXkFtZTgwMzc0MDE4NDM@._V1_.jpg",810,1200]},{"l":"Star Wars: The Last Jedi","id":"tt2527336","s":"Daisy Ridley, John Boyega","y":2017,"q":"feature","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_.jpg",800,1185]},{"l":"Rogue One: A Star Wars Story","id":"tt3748528","s":"Felicity Jones, Diego Luna","y":2016,"q":"feature","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_.jpg",864,1280]},{"l":"Star Wars: The Force Awakens","id":"tt2488496","s":"Daisy Ridley, John Boyega","y":2015,"q":"feature","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_.jpg",2194,3240]},{"l":"Star Wars: Episode IV - A New Hope","id":"tt0076759","s":"Mark Hamill, Harrison Ford","y":1977,"q":"feature","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",1820,2827]},{"l":"Star Wars: Rebels","id":"tt2930604","s":"Taylor Gray, Freddie Prinze Jr.","y":2014,"q":"TV series","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q1ZTAzNzMtMzlmNy00NjdjLThhYjgtMzgxN2ZkYmFhMDIwXkEyXkFqcGdeQXVyMjg5NDMwMQ@@._V1_.jpg",1000,1493]},{"l":"Star Wars: Episode I - The Phantom Menace","id":"tt0120915","s":"Ewan McGregor, Liam Neeson","y":1999,"q":"feature","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",1230,1845]}]})'

    const actual = await deriveJsonFromIMDBResponse(imdbReturn)
    const expected = {
      data: [
        {
          title: 'Solo: A Star Wars Story',
          year: 2018,
          format: 'feature',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjAwNzI3OTA5MV5BMl5BanBnXkFtZTgwMzc0MDE4NDM@._V1_.jpg',
        },
        {
          title: 'Star Wars: The Last Jedi',
          year: 2017,
          format: 'feature',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_.jpg',
        },
        {
          title: 'Rogue One: A Star Wars Story',
          year: 2016,
          format: 'feature',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_.jpg',
        },
        {
          title: 'Star Wars: The Force Awakens',
          year: 2015,
          format: 'feature',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_.jpg',
        },
        {
          title: 'Star Wars: Episode IV - A New Hope',
          year: 1977,
          format: 'feature',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
        },
        {
          title: 'Star Wars: Rebels',
          year: 2014,
          format: 'TV series',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q1ZTAzNzMtMzlmNy00NjdjLThhYjgtMzgxN2ZkYmFhMDIwXkEyXkFqcGdeQXVyMjg5NDMwMQ@@._V1_.jpg',
        },
        {
          title: 'Star Wars: Episode I - The Phantom Menace',
          year: 1999,
          format: 'feature',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
        },
      ],
      error: false,
      errorMsg: '',
    }

    expect(actual).to.deep.equal(expected)
  })


  it('Returns TV shows and movies', async() => {
    const imdbReturn = 'imdb$breaking_bad({"v":1,"q":"breaking_bad","d":[{"l":"Breaking Bad","id":"tt0903747","s":"Bryan Cranston, Aaron Paul","y":2008,"q":"TV series","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BZDNhNzhkNDctOTlmOS00NWNmLWEyODQtNWMxM2UzYmJiNGMyXkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_.jpg",571,800]},{"l":"Breaking Bad: Original Minisodes","id":"tt2387761","s":"Bob Odenkirk, Matt Jones","y":2009,"q":"TV mini-series","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BMDdlM2QzOGMtODc2My00NTFjLWIyZGUtYjQ4NDNhZjYyM2NkXkEyXkFqcGdeQXVyMDM0MzU2NA@@._V1_.jpg",440,640]},{"l":"The Bad News Bears in Breaking Training","id":"tt0075718","s":"William Devane, Jackie Earle Haley","y":1977,"q":"feature","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BNjI0ZTRmNTEtYjVhMC00MTM0LWFjNDQtYjBhNTNlNWRlMDgxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",960,1440]},{"l":"Breaking Bad Movie Deal Gone Bad","id":"tt4669580","s":"Don Alphonso, Gustavo Ruben Valenzuela","y":2015,"q":"feature","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BZGVhNzc2MmItZjY1Ni00ZGQzLTlhMzUtZmIwMWE1ZDc4YmQ3XkEyXkFqcGdeQXVyMzY4MDAyMDQ@._V1_.jpg",1448,2048]},{"l":"Breaking Bad: The Middle School Musical","id":"tt4135410","s":"Delaney Dillan, Logan Gould","y":2013,"q":"video","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BNDcwYjM2OTEtMzg4NC00YjU5LTg4ZWMtNjcxYzU3Njc5OGU0XkEyXkFqcGdeQXVyMTIxMDUyOTI@._V1_.jpg",660,330]},{"l":"Breaking Bad Cereal","id":"tt4327552","s":"Vanessa Golembewski, Vanessa Golembewski","y":2014,"q":"video"},{"l":"Breaking Bad Season 3: Silent But Deadly - The Brothers Moncada","id":"tt2380191","s":"Vince Gilligan, Daniel Moncada","y":2011,"q":"video"},{"l":"Breaking In","id":"tt7137846","s":"Gabrielle Union, Billy Burke","y":2018,"q":"feature","i":["https://images-na.ssl-images-amazon.com/images/M/MV5BNWQ3OTRjNTUtM2JiNC00NTZjLTg4YjAtMWI5NmZhOGJlZDA5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",3158,5000]}]})'

    const actual = await deriveJsonFromIMDBResponse(imdbReturn)
    const expected = {
      data: [
        {
          title: 'Breaking Bad',
          year: 2008,
          format: 'TV series',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZDNhNzhkNDctOTlmOS00NWNmLWEyODQtNWMxM2UzYmJiNGMyXkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_.jpg',
        },
        {
          title: 'The Bad News Bears in Breaking Training',
          year: 1977,
          format: 'feature',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNjI0ZTRmNTEtYjVhMC00MTM0LWFjNDQtYjBhNTNlNWRlMDgxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
        },
        {
          title: 'Breaking Bad Movie Deal Gone Bad',
          year: 2015,
          format: 'feature',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZGVhNzc2MmItZjY1Ni00ZGQzLTlhMzUtZmIwMWE1ZDc4YmQ3XkEyXkFqcGdeQXVyMzY4MDAyMDQ@._V1_.jpg',
        },
        {
          title: 'Breaking In',
          year: 2018,
          format: 'feature',
          poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNWQ3OTRjNTUtM2JiNC00NTZjLTg4YjAtMWI5NmZhOGJlZDA5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
        },
      ],
      error: false,
      errorMsg: '',
    }

    expect(actual).to.deep.equal(expected)
  })
})
