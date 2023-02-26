const { pgp, db } = require('../.config/postgres')
const contestantM = require('./contestant.m')
var emailCheck = require('email-check')
module.exports = {
  voting: async ({ id, email }) => {
    try {
      console.log('Voting')
      const total = await db.query(
        `SELECT * FROM public."Voting" WHERE  "email" like $1`,
        [email],
      )
      if (total.length >= 3) {
        return 'already'
      } else {
        let map = []
        let count = total.length
        id.forEach((element) => {
          if (
            !total.some((item) => item.id.toString() === element.toString())
          ) {
            map.push(element.toString())
            count = count + 1
            if (count <= 3) {
              db.query(
                `INSERT INTO  public."Voting"(id,email,"timeStamp") values($1,$2,$3)`,
                [element.toString(), email, new Date()],
              )
            }
          }
        })

        return 3 - total.length - map.length >= 0
          ? 3 - total.length - map.length
          : 0
      }

      // var totalVote = 3 - total.length
      // if (total.length >= 3) {
      //   return 'already'
      // }
      // id.forEach(async (element) => {
      //   sum = await db.query(
      //     `SELECT * FROM public."Voting" WHERE  "email" like $1`,
      //     [email],
      //   )
      //   if (sum.length < 3) {
      //     const line = await db.query(
      //       `SELECT * FROM public."Voting" WHERE "id" like $1 and "email" like $2`,
      //       [element, email],
      //     )
      //     if (line.length === 0) {
      //       db.query(
      //         `INSERT INTO  public."Voting"(id,email,"timeStamp") values($1,$2,$3)`,
      //         [element, email, new Date()],
      //       )
      //       totalVote = totalVote - 1
      //     }
      //   } else {
      //     return 0
      //   }
      // })

      return sum.length
    } catch (err) {
      return err
    }
  },
  getallVoting: async () => {
    let line = await db.query(
      `SELECT "VT"."id" as "id", COUNT(DISTINCT("VT"."email")) as "number"
      FROM public."Voting" as "VT" 
      GROUP BY "VT"."id" 
      ORDER BY "number" DESC, "VT"."id" ASC`,
    )

    const result = await Promise.all(
      line.map(async (doc) => {
        if ((await contestantM.checkContestants(doc.id.toString())) !== true) {
          return { ...doc, exist: false }
        } else {
          return { ...doc, exist: true }
        }
      }),
    )
    console.log(result)
    return result
  },
}
