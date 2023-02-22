const { admin, db } = require('../.config/firebase')
module.exports = {
  addContestant: async ({
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
  }) => {
    try {
      const getContestants = await db.collection('contestants').doc(id).get()
      if (getContestants.exists) {
        return false
      } else {
        db.collection('contestants').doc(id).set({
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
        return true
      }
    } catch (err) {
      return err
    }
  },
  getAllContestant: async () => {
    let data = []
    const list = await db.collection('contestants').get()
    list.docs.map((doc) => data.push(doc.data()))
    return data
  },
  getContestant: async (id) => {
    const data = await db.collection('contestants').doc(id).get()
    const result = data.data()

    let {
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
    } = result
    let resultSale = {
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
      ddt: ddt.replaceAll('<br>', ''),
      htt: htt.replaceAll('<br>', ''),
      tlt: tlt.replaceAll('<br>', ''),
      tnt: tnt.replaceAll('<br>', ''),
      hnt: hnt.replaceAll('<br>', ''),
      achievement,
    }

    return resultSale
  },
  editContestant: async ({
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
  }) => {
    try {
      db.collection('contestants').doc(id).set({
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
      console.log('overwrite successed')
      return true
    } catch (err) {
      return err
    }
  },
  deleteContestant: async (id) => {
    try {
      console.log(id)
      const data = await db.collection('contestants').doc(`${id}`).get()
      console.log(data.data())
      const result = await db.collection('contestants').doc(`${id}`).delete()
      console.log('delete successed')
      return true
    } catch (err) {
      console.log(err)
      return err
    }
  },
  search: async (inp) => {
    try {
      let data = []
      const list = await db
        .collection('contestants')
        .where('id', '>=', inp)
        .where('id', '<=', `${inp}\uF7FF`)
        .get()
      list.docs.map((doc) => data.push(doc.data()))
      const listA = await db
        .collection('contestants')
        .where('name', '>=', inp)
        .where('name', '<=', `${inp}\uF7FF`)
        .get()
      listA.docs.map((doc) => data.push(doc.data()))
      const listB = await db
        .collection('contestants')
        .where('fmname', '>=', inp)
        .where('fmname', '<=', `${inp}\uF7FF`)
        .get()
      listB.docs.map((doc) => data.push(doc.data()))
      return data
    } catch (err) {
      console.log(err)
      return err
    }
  },
  checkContestants: async (id) => {
    const getContestants = await db.collection('contestants').doc(id).get()

    if (getContestants.exists === true) {
      return true
    } else {
      return false
    }
  },
}
