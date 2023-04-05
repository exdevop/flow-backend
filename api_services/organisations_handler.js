const Organisation = require('../models/organisation')
const axios = require('axios');
module.exports.loadOrganisations = async (req, res) => {
  const query = req.query;
  //Initialise transaction
  let session = await Organisation.startSession()
  await session.startTransaction()
  try {
    //Check if property listings have been loaded before
    let docs
    docs = await Organisation.find({...query}).skip(req.params.offset).limit(req.params.limit).session(session)
    if (!!docs[0]) {
      return res.json({docs})
    }
    //todo Handle External API failures
    let {data} = await axios.get(process.env.ORGANISATIONS_URL)
    console.log({data})
    await Organisation.create(data, {session})
    docs = await Organisation.find({...query}).skip(req.params.offset).limit(req.params.limit).session(session)
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