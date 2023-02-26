const VottingM = require('../models/votting.m')

module.exports = {
  voting: async (req, res, next) => {
    try {
      let { chosen, email } = req.body
      let id = []
      chosen.map((item) => id.push(item.id))
      console.log(id)
      const message = await VottingM.voting({ id, email })
      return res.status(200).send({
        message: message,
      })
    } catch (err) {
      next(err)
    }
  },
  getallVoting: async (req, res, next) => {
    const result = await VottingM.getallVoting()
    return res.render('voting.hbs', {
      data: result,
    })
  },
  resetVoting: async (req, res, next) => {
    const result = await VottingM.resetVote()
    return res.redirect('/sum')
  },
}
