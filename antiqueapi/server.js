const express = require('express')
const app = express()
const port = 3000
const db = require('./db')
const cors = require("cors")
const bodyParser = require("body-parser");
app.use(cors());
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/db', async (req, res) => {
    try {
        const result = await db.pool.query("SELECT * FROM `mainview` ");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

app.get('/auto', async (req, res) => {
    try {
        const result = await db.pool.query("SELECT * FROM `autoview` ");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

app.get('/kunde', async (req, res) => {
    try {
        const result = await db.pool.query("SELECT * FROM `kundeview` ");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

app.get('/personal', async (req, res) => {
    try {
        const result = await db.pool.query("SELECT * FROM `personalview` ");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

app.post("/help", (req, res) => {
    console.log(req.body);
    res.send("")
})

app.post('/db', async (req, res) => {
    let request = req.body;
    console.log(req.body);
    try {
        const result = await db.pool.query(`CALL insert_data(${request.autoid}, ${request.kundeid}, ${request.personalid}, "${request.ausleihdatum}", "${request.rueckgabedatum}", ${request.anfangskm}, ${request.endekm});`);
        res.sendStatus(200);
    } catch (err) {
        throw err;
    }
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})