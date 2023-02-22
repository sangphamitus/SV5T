const app = require('express')
const router = app.Router()
const contestantC = require('../controller/contestant.c')

router.get('/:id', contestantC.editView, () => {
  next()
})
router.get('/', (req, res, next) => {
  return res.render('error.hbs')
})
module.exports = router
