const PropertyItem = require('../models/property_item')
const axios = require('axios');
module.exports.loadPropertyListings = async (req, res) => {
  const query = req.query;
  //Initialise transaction
  let session = await PropertyItem.startSession()
  await session.startTransaction()
  try {
    //Check if property listings have been loaded before
    let docs
    docs = await PropertyItem.find({...query}).populate(['organisation', 'agent']).skip(req.params.offset).limit(req.params.limit).session(session)
    if (!!docs[0]) {
      return res.json({docs})
    }
    //todo Handle External API failures
    let {data} = await axios.get(process.env.PROPERTY_LISTINGS_URL)
    await PropertyItem.create(data, {session})
    docs = await PropertyItem.find({...query}).populate(['organisation', 'agent']).skip(req.params.offset).limit(req.params.limit).session(session)
    await session.commitTransaction()
    res.json({docs});
  } catch (err) {
    console.error(err)
    await session.abortTransaction()
    res.status(400).send({errors: [err]});
  } finally {
    await session.endSession();
  }
}