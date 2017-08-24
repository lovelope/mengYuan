'use strict'
const mysql = require('mysql')
const ALL_CONFIG = require('./../../config')
const DB_CONFIG = ALL_CONFIG.DB

const THIRTY_MINUTES = 30 * 60 * 1000
const TEN_MINUTES = 10 * 60 * 1000

const pool = mysql.createPool({
  host: DB_CONFIG.HOST,
  user: DB_CONFIG.USERNAME,
  password: DB_CONFIG.PASSWORD,
  database: DB_CONFIG.DATABASE,
  timezone: DB_CONFIG.TIMEZONE,
  dateStrings: DB_CONFIG.DATE_STRINGS
})

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          console.log(`\n>--- sql: ${sql} ---><\n`)
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

let getExpiresOn = function (session, ttl) {
  let expiresOn = null
  ttl = ttl || THIRTY_MINUTES

  if (session && session.cookie && session.cookie.expires) {
    if (session.cookie.expires instanceof Date) {
      expiresOn = session.cookie.expires
    } else {
      expiresOn = new Date(session.cookie.expires)
    }
  } else {
    let now = new Date()
    expiresOn = new Date(now.getTime() + ttl)
  }
  return expiresOn
}

let cleanup = function () {
  let now = Number(new Date())
  let _sql = 'DELETE FROM `_mysql_session_store` WHERE expires  < ?'
  return query(_sql, [ now ])
}

let setup = function () {
  let _sql = 'CREATE  TABLE IF NOT EXISTS `_mysql_session_store` (`id` VARCHAR(255) NOT NULL, `expires` BIGINT NULL, `data` TEXT NULL, PRIMARY KEY (`id`));'
  setInterval(cleanup, TEN_MINUTES)
  return query(_sql, [])
}

let get = function (sid) {
  let _sql = 'SELECT * FROM `_mysql_session_store` WHERE id  = ?'
  let results = query(_sql, [sid])
  let session = null
  if (results && results[0] && results[0][0] && results[0][0].data) {
    session = JSON.parse(results[0][0].data)
  }
  return session
}

let set = function (sid, session, ttl) {
  let _sql = 'INSERT INTO _mysql_session_store(id, expires, data) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE expires=?, data =?'
  let expires = getExpiresOn(session, ttl).valueOf()
  let data = JSON.stringify(session)
  return query(_sql, [sid, expires, data, expires, data])
}

let destroy = function (sid) {
  let _sql = 'DELETE FROM `_mysql_session_store` WHERE id  = ?'
  return query(_sql, [sid])
}

class MysqlStore {
  constructor () {
    this.cleanup = cleanup
    this.setup = setup
    this.get = get
    this.set = set
    this.destroy = destroy
    setup()
  }
}

module.exports = MysqlStore
