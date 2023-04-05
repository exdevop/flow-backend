require('./models/db')
const express = require('express');
const rateLimit = require("express-rate-limit");
let app = express()
let propertyApi = require('./apis/property_api')
let agentsApi = require('./apis/agents_api')
let organisationsApi = require('./apis/organisations_api')
const limiter = rateLimit({
  windowMs: 2 * 1000, /*2 seconds*/
  max: 10 /*limit each IP to 10 requests per windowMs*/,
  standardHeaders: true,  /*Return rate limit info in the `RateLimit-*` headers*/
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({limit: '5mb', extended: true}));
app.get('/test', (req, res) => res.send('API working'))
app.use('/apiV1/listings', propertyApi)
app.use('/apiV1/agents', agentsApi)
app.use('/apiV1/organisations', organisationsApi)
// app.listen(8001, () => console.log('Running'))
module.exports = app