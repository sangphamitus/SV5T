const app = require('express')
const router = app.Router()
const contestantC = require('../controller/contestant.c')

router.get('/', contestantC.editView, () => {
  next()
})

module.exports = router
