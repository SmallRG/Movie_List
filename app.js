//require pacakages used in the project
const express = require('express')
const app = express()
const port = 3000
const movieList = require('./movieList.json')
// require express-handlebars here
const exhbs = require('express-handlebars')
// setting template engine
app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/', (req, res) => {

  // past the movie data into 'index' partial template
  res.render('index', { movies: movieList.results });
})

app.get('/movies/:movie_id', (req, res) => {
  movieId = req.params.movie_id - 1
  res.render('show', { movies: movieList.results[movieId] })
})

//search function
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter((movie) => {
    return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { movies: movies ,keyword:keyword})
})

//set static file
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})