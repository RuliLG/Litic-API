const express = require('express')
const cors = require('cors')
const { Litic } = require('litic')
const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())

const isValidUrl = (url) => {
    try {
        new URL(url)
    } catch (e) {
        return false;
    }

    return true;
}

app.post('/invoke', async (req, res) => {
    const { url, keyword } = req.body
    if (!isValidUrl(url)) {
        return res.status(422).send({ error: 'Invalid URL' })
    }

    const litic = new Litic(url, { keyword })
    return litic.test()
        .then(() => {
            if (litic.didFail()) {
                return res.status(500).send({ error: 'Could not finish analysis' })
            }

            res.send({
                results: litic.getResults()
            })
        })
        .catch(error => {
            res.status(500).send({ error: 'Could not finish analysis' })
        })
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
