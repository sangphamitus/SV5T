const app = require('express')
const router = app.Router()
const contestantC = require('../controller/contestant.c')

router.post('/', contestantC.editView, () => {
  next()
})

module.exports = router
