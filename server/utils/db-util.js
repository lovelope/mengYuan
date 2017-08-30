const ALL_CONFIG = require('./../../config')
const DB_CONFIG = ALL_CONFIG.DB
const mysql = require('mysql')

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
        let query = connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
        console.log(`\n>--- query.sql: ${query.sql} ---<\n`)
      }
    })
  })
}

let createTable = function (sql) {
  return query(sql, [])
}

let findDataById = function (table, id) {
  let _sql = 'SELECT * FROM ?? WHERE id = ? '
  return query(_sql, [ table, id ])
}

let findDataByPage = function (table, keys, start, length) {
  let _sql = 'SELECT ?? FROM ??  LIMIT ? , ?'
  return query(_sql, [ keys, table, start, length ])
}

let insertData = function (table, values) {
  let _sql = 'INSERT INTO ?? SET ?'
  return query(_sql, [ table, values ])
}

let updateData = function (table, values, id) {
  let _sql = 'UPDATE ?? SET ? WHERE id = ?'
  return query(_sql, [ table, values, id ])
}

let deleteDataById = function (table, id) {
  let _sql = 'DELETE FROM ?? WHERE id = ?'
  return query(_sql, [ table, id ])
}

let select = function (table, keys) {
  let _sql = 'SELECT ?? FROM ?? '
  return query(_sql, [ keys, table ])
}

let count = function (table) {
  let _sql = 'SELECT COUNT(*) AS total_count FROM ?? '
  return query(_sql, [ table ])
}

module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count
}
