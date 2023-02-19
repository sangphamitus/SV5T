const { pgp, db } = require('../.config/postgres')
const contestantM = require('./contestant.m')
var emailCheck = require('email-check')
module.exports = {
  voting: async ({ id, email }) => {
    try {
      if ((await contestantM.checkContestants(id)) !== true) {
        return 'Not exist id'
      } else {
        const exist_email = await emailCheck(email)
        if (exist_email === false) {
          return 'Not exist email'
        } else {
          const line = await db.query(
            `SELECT * FROM public."Voting" WHERE "id" like $1 and "email" like $2`,
            [id, email],
          )
          console.log(line)
          if (line.length > 0) {
            return 'already voting'
          }
          db.query(
            `INSERT INTO  public."Voting"(id,email,"timeStamp") values($1,$2,$3)`,
            [id, email, new Date()],
          )
          return 'Succeed'
        }
      }
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
        if ((await contestantM.checkContestants(doc.id)) !== true) {
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
