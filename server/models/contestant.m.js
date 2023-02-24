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
        db.collection('contestants')
          .doc(id)
          .set({
            id,
            img,
            fmname,
            name,
            dob,
            place,
            clss,
            faculty,
            drl: parseFloat(drl.replace(',', '.')),
            dht: parseFloat(dht.replace(',', '.')),
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
      ddt: ddt.split('<br>').join(''),
      htt: htt.split('<br>').join(''),
      tlt: tlt.split('<br>').join(''),
      tnt: tnt.split('<br>').join(''),
      hnt: hnt.split('<br>').join(''),
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
      db.collection('contestants')
        .doc(id)
        .set({
          id,
          img,
          fmname,
          name,
          dob,
          place,
          clss,
          faculty,
          drl: parseFloat(drl.replace(',', '.')),
          dht: parseFloat(dht.replace(',', '.')),
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
  clientGet: async ({ page, rows, id, names, faculty, gen, drl, dht }) => {
    let data = []
    const list = await db.collection('contestants').get()
    list.docs.map((doc) => data.push(doc.data()))
    if (id.length !== 0) {
      data = data.filter((item) => item.id.includes(id))
    }

    if (names.length !== 0) {
      data = data.filter((item) =>
        (item.fmname + ' ' + item.name)
          .toLowerCase()
          .includes(names.toLowerCase().trim()),
      )
    }

    if (faculty.length !== 0) {
      data = data.filter((item) =>
        item.faculty.toLowerCase().includes(faculty.toLowerCase().trim()),
      )
    }

    if (gen.length !== 0) {
      data = data.filter((item) =>
        item.gen.toLowerCase().includes(gen.toLowerCase().trim()),
      )
    }

    if (drl !== 0 && dht !== 0) {
      data = data.sort((b, a) =>
        a.drl === b.drl ? (a.dht - b.dht) * dht : (a.drl - b.drl) * drl,
      )
    } else {
      switch (drl) {
        case 1:
          data = data.sort((a, b) => {
            return b.drl - a.drl
          })
          break
        case -1:
          data = data.sort((a, b) => {
            return a.drl - b.drl
          })
          break
      }
      switch (dht) {
        case 1:
          data = data.sort((a, b) => {
            return b.dht - a.dht
          })
          break
        case -1:
          data = data.sort((a, b) => {
            return a.dht - b.dht
          })
          break
      }
    }

    const maxPage = Math.ceil((data.length * 1.0) / rows)
    const returnData = data.slice((page - 1) * rows, page * rows)

    return {
      maxPage,
      returnData,
    }
  },
}
