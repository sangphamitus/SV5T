const VottingM = require('../models/votting.m')

module.exports = {
  voting: async (req, res, next) => {
    try {
      let { id, email } = req.body
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
}
