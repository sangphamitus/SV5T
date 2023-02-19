const pg = require('pg')
const pgp = require('pg-promise')({})
const databaseConfig = {
  host: 'dpg-cfp0ifarrk0fd9qpfqp0-a.oregon-postgres.render.com',
  port: '5432',
  user: 'sv5t_user',
  password: 'dkDxzg0hgVXAj3HNqw1Fzmu5AhWiHQTL',
  database: 'sv5t',
  ssl: true,
}
const db = pgp(databaseConfig)
module.exports = {
  pgp,
  db,
}
