const { Pool } = require('pg')

const poll = new Pool({
    host: 'db',
    port: 5432,
    user: 'rafael',
    password: '12345678',
    database: 'dbcrud'
})

module.exports = poll