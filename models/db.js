const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected!')).catch(console.error);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('we\'re connected!'));
require('./organisation')
require('./property_agent')
require('./property_item')