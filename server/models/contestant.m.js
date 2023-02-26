const { admin, db } = require('../.config/firebase')
const fsPromises = require('fs/promises')
const fs = require('fs')
const FileData = './data/data.json'
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
      const read = await fsPromises.readFile(FileData)
      // Turn it to an object
      const obj = JSON.parse(read)
      let data = obj
      const getContestants = obj.filter((doc) => doc.id.toString() === id)
      if (getContestants.length > 0) {
        return false
      } else {
        data.push({
          id,
          img,
          fmname,
          name,
          dob,
          place,
          clss,
          faculty,
          drl: parseFloat(drl.replace(',', '.').replace('@', '')),
          dht: parseFloat(dht.replace(',', '.').replace('@', '')),
          gen,
          course,
          ddt,
          htt,
          tlt,
          tnt,
          hnt,
          achievement,
        })
        fs.writeFileSync(FileData, JSON.stringify(data), 'utf8')
        return true
      }
    } catch (err) {
      return err
    }
  },
  getAllContestant: async () => {
    console.log(FileData)
    const read = await fsPromises.readFile(FileData)

    const obj = JSON.parse(read)

    return obj
  },
  getContestant: async (id) => {
    const data = await getAllContestant()
    const result = data.filter((item) => item.id == id)[0]

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
      const read = await fsPromises.readFile(FileData)
      // Turn it to an object
      const obj = JSON.parse(read)

      const data = obj.filter((doc) => doc.id.toString() !== id)
      fs.writeFileSync(FileData, JSON.stringify(data), 'utf8')
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
      const read = await fsPromises.readFile(FileData)
      // Turn it to an object
      const fullData = JSON.parse(read)

      const list = fullData.filter((doc) => doc.id.toString().includes(inp))
      list.map((doc) => data.push(doc))
      const listA = fullData.filter((doc) =>
        doc.fmname.toString().includes(inp),
      )
      listA.map((doc) => data.push(doc))
      const listB = fullData.filter((doc) => doc.name.toString().includes(inp))
      listB.map((doc) => data.push(doc))

      return data
    } catch (err) {
      console.log(err)
      return err
    }
  },
  checkContestants: async (id) => {
    const read = await fsPromises.readFile(FileData)
    // Turn it to an object
    const fullData = JSON.parse(read)
    const getContestants = fullData.filter((item) => item.id.toString() == id)

    if (getContestants.length > 0) {
      return true
    } else {
      return false
    }
  },
  clientGet: async ({ page, rows, id, names, faculty, gen, drl, dht }) => {
    let data = []

    const read = await fsPromises.readFile(FileData)
    // Turn it to an object
    const list = JSON.parse(read)

    list.map((doc) => {
      data.push({
        ...doc,
        drl: parseFloat(doc.drl.replace(',', '.').replace('@', '')),
        dht: parseFloat(doc.dht.replace(',', '.').replace('@', '')),
      })
    })

    if (id.toString().length !== 0) {
      data = data.filter((item) => item.id.toString().includes(id))
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

    if (gen.toString().length !== 0) {
      data = data.filter((item) =>
        item.gen.toString().toLowerCase().includes(gen.toLowerCase().trim()),
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
    console.log(maxPage)
    return {
      maxPage,
      returnData,
    }
  },
}
