const express = require('express')
const cors = require('cors')
const exphbs = require('express-handlebars')
const dotenv = require('dotenv')
dotenv.config()
var verifier = require('email-verify')
const PORT = 5200 || process.env.PORT
// const {
//   allowInsecurePrototypeAccess,
// } = require('@handlebars/allow-prototype-access')
const app = express()
var bodyParser = require('body-parser')
app.use(cors())

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).send(err.messages)
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'container.hbs',
    layoutsDir: 'views/_layouts',
  }),
)

app.use('/contestant', require('./router/contestant.r'), errorHandler)
app.get('/', require('./controller/contestant.c').getAllView, errorHandler)
app.get('/add', require('./controller/contestant.c').addView, errorHandler)

app.get(
  '/editContest',
  require('./controller/contestant.c').editView,
  errorHandler,
)

app.get('/search', require('./controller/contestant.c').search, errorHandler)
app.post('/voting', require('./controller/votting.c').voting, errorHandler)
app.get('/sum', require('./controller/votting.c').getallVoting, errorHandler)
app.get('/delete', require('./controller/votting.c').resetVoting, errorHandler)
app.post(
  '/deleteCode',
  require('./controller/votting.c').deleteCode,
  errorHandler,
)
app.post(
  '/emailVerify',
  async (req, res, next) => {
    
    const { email } = req.body
    verifier.verify(`${email}`, function (err, info) {
      if (err) {
        return res.status(200).send({
          result: 'try',
        })
      } else {
        if (info.success) {
          return res.status(200).send({
            result: 'success',
          })
        } else {
          return res.status(200).send({
            result: 'not',
          })
        }
      }
    })
  },
  errorHandler,
)
app.get('/resetVote', require('./models/authorize.m').codeVerify, errorHandler)

app.listen(PORT, () =>
  console.log(`Server Listening on  http://127.0.0.1:${PORT}/    `),
)
