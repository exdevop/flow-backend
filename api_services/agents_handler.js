const PropertyAgent = require('../models/property_agent');
const axios = require('axios');
module.exports.loadPropertyAgents = async (req, res) => {
  const query = req.query;
  //Initialise transaction
  let session = await PropertyAgent.startSession()
  await session.startTransaction()
  try {
    //Check if property listings have been loaded before
    let docs
    docs = await PropertyAgent.find({...query}).skip(req.params.offset).limit(req.params.limit).session(session)
    if (!!docs[0]) {
      return res.json({docs})
    }
    //todo Handle External API failures
    let {data} = await axios.get(process.env.PROPERTY_AGENTS_URL)
    console.log({data, type: typeof data})
    console.log(JSON.parse(data))
    await PropertyAgent.create(JSON.parse(data), {session})
    docs = await PropertyAgent.find({...query}).skip(req.params.offset).limit(req.params.limit).session(session)
    await session.commitTransaction()
    res.json({docs});
  } catch (err) {
    console.error(err)
    await session.abortTransaction()
    res.status(500).send({errors: [err.message]});
  } finally {
    await session.endSession();
  }
}