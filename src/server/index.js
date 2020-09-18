var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const app = express()
const cors = require('cors');

// requirements for interaction with meaningCloud
const apiKey = process.env.API_KEY
var entryUrl = [];
const fetch = require('node-fetch');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)
app.options('*', cors())

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('Example app listening on port 8082!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// Post Endpoint for interaction with meaningCloud
app.post('/meaningCloud', callMeaning);
    async function callMeaning(req, res) {
        entryUrl = req.body.url;
        const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${req.body.url}&lang=en`

        const response = await fetch(apiUrl)
        const meaningdata = await response.json()
        const projectData = {
            score_tag : meaningdata.score_tag,
            agreement : meaningdata.agreement,
            subjectivity : meaningdata.subjectivity,
            confidence : meaningdata.confidence,
            irony : meaningdata.irony
        }
        res.send(projectData);
    }