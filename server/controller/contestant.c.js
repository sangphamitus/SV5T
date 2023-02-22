const contestantsM = require('../models/contestant.m')

module.exports = {
  post: async (req, res, next) => {
    try {
      let {
        id,
        img,
        fmname,
        name,
        dob,
        place,
        clss,
        faculty,
        gen,
        course,
        drl,
        dht,
        ddt,
        htt,
        tlt,
        tnt,
        hnt,
        achievement,
      } = req.body
      const result = await contestantsM.addContestant({
        id,
        img,
        fmname,
        name,
        dob,
        place,
        clss,
        faculty,
        drl,
        dht,
        gen,
        course,
        ddt,
        htt,
        tlt,
        tnt,
        hnt,
        achievement,
      })

      if (result === true || result === false)
        res.status(200).send({
          messages: result ? 'add successed' : 'contestants exist',
        })
      else {
        res.status(200).send({
          messages: 'error',
        })
      }
    } catch (err) {
      next(err)
    }
  },
  getAll: async (req, res, next) => {
    try {
      const result = await contestantsM.getAllContestant()
      res.status(200).send({
        data: result,
        messages: 'success',
      })
    } catch (err) {
      next(err)
    }
  },
  getAllView: async (req, res, next) => {
    try {
      const result = await contestantsM.getAllContestant()
      return res.render('home.hbs', {
        data: result,
      })
    } catch (err) {
      next(err)
    }
  },
  addView: async (req, res, next) => {
    try {
      const result = await contestantsM.getAllContestant()
      return res.render('add.hbs', {
        data: result,
      })
    } catch (err) {
      next(err)
    }
  },
  editView: async (req, res, next) => {
    try {
      const id = req.query.id
      const result = await contestantsM.getContestant({ id })

      return res.render('edit.hbs', {
        data: result,
      })
    } catch (err) {
      return res.render('error.hbs', {})
    }
  },
  edit: async (req, res, next) => {
    try {
      let {
        id,
        img,
        fmname,
        name,
        dob,
        place,
        clss,
        faculty,
        gen,
        course,
        drl,
        dht,
        ddt,
        htt,
        tlt,
        tnt,
        hnt,
        achievement,
      } = req.body

      const result = await contestantsM.editContestant({
        id,
        img,
        fmname,
        name,
        dob,
        place,
        clss,
        faculty,
        drl,
        dht,
        gen,
        course,
        ddt,
        htt,
        tlt,
        tnt,
        hnt,
        achievement,
      })
      console.log(result)
      if (result === true || result === false)
        res.status(200).send({
          messages: result ? 'add successed' : 'contestants exist',
        })
      else {
        res.status(200).send({
          messages: 'error',
        })
      }
    } catch (err) {
      next(err)
    }
  },
  delete: async (req, res, next) => {
    try {
      let { id } = req.body
      console.log(id)
      const result = await contestantsM.deleteContestant(id)
      if (result === true || result === false)
        res.status(200).send({
          messages: result ? 'delete' : 'contestants exist',
        })
      else {
        res.status(200).send({
          messages: result,
        })
      }
    } catch (err) {
      next(err)
    }
  },
  search: async (req, res, next) => {
    try {
      let inp = req.query.inp

      const result = await contestantsM.search(inp)
      return res.render('home.hbs', {
        data: result,
      })
    } catch (err) {
      next(err)
    }
  },
}
