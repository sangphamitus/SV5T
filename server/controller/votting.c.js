const VottingM = require('../models/votting.m')
const AuthorizeM = require('../models/authorize.m')
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
    console.log('resetVoting success')
    const result = await VottingM.resetVote()
    return res.redirect('/sum')
  },
  deleteCode: async (req, res, next) => {
    AuthorizeM.codeGenerater()
    const result = await VottingM.getallVoting()
    return res.render('voting.hbs', {
      data: result,
      messages: 'Đã gửi mã, nếu không có,hãy check trong thư mục spam',
    })
  },
  deleteFail: async (req, res, next) => {
    const result = await VottingM.getallVoting()
    return res.render('voting.hbs', {
      data: result,
      messages: 'Mã không có hiệu lực',
    })
  },
}
