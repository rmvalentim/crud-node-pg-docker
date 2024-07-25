const express = require('express')
const pool = require('./db')
const port = 3000

const app = express()
app.use(express.json())

// routes
app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM person')
        res.status(200).send({
            persons: data.rows
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/', async (req, res) => {
    const { name, location } = req.body
    try {
        await pool.query('INSERT INTO person (name, location) VALUES ($1, $2)', [name, location])
        res.status(200).send({
            message: 'Person created'
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE person (id SERIAL PRIMARY KEY, name VARCHAR(100), location VARCHAR(200))')
        res.status(200).send({
            message: 'Database setup successfully'
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})