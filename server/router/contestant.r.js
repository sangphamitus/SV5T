const app = require('express')
const router = app.Router()
const contestantC = require('../controller/contestant.c')

router.post('/add', contestantC.post, () => {
  next()
})
router.post('/getAll', contestantC.getAll, () => {
  next()
})
router.post('/edit', contestantC.edit, () => {
  next()
})
router.post('/delete', contestantC.delete, () => {
  next()
})
module.exports = router
