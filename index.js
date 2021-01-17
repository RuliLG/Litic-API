const express = require('express')
const { Litic } = require('litic')
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.get('/invoke', (req, res) => {
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
