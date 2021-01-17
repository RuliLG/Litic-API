const express = require('express')
const { Litic } = require('litic')
const port = process.env.PORT || 3000

const app = express()
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
        return res.sendStatus(422).send({ error: 'Invalid URL' })
    }

    const litic = new Litic(url, { keyword })
    try {
        await litic.test()
    } catch {
        return res.sendStatus(500).send({ error: 'Could not finish analysis' })
    }

    if (litic.didFail()) {
        return res.sendStatus(500).send({ error: 'Could not finish analysis' })
    }

    res.send({
        results: litic.getResults()
    })
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
