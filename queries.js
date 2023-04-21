const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Nice Try GitHub',
    port: 5432,
})

const getCountries = (req, res) => {
    pool.query('SELECT name FROM countries', (error, results) => {
        if (error) {
            throw error
        }
        res.json(results.rows)
    })
}

const getPopulation = (req, res) => {
    const id = req.params.id
    pool.query('SELECT name, population FROM countries WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.json(results.rows)
    })
}

const getGDP = (req, res) => {
    const id = req.params.id
    pool.query('SELECT name, gdp FROM countries WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.json(results.rows)
    })
}

const getArea = (req, res) => {
    const id = req.params.id
    pool.query('SELECT name, area FROM countries WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.json(results.rows)
    })
}

const getCarbon = (req, res) => {
    const id = req.params.id
    pool.query('SELECT name, carbon FROM countries WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.json(results.rows)
    })
}

const getCapital = (req, res) => {
    const id = req.params.id
    pool.query('SELECT name, capital FROM countries WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.json(results.rows)
    })
}

const postHighScore = (req, res) => {
    const correct = req.params.correct
    const total = req.params.total
    pool.query('INSERT INTO scores (correct, total) VALUES ($1, $2)', [correct, total], (error, results) => {
        if (error) {
            throw error
        }
        res.json("Success!")
    })
}

module.exports = {
    getCountries, getPopulation, getGDP, getArea, getCarbon, getCapital, postHighScore
};