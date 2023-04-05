const express = require('express');
const PropertyAgent = require('../models/property_agent')
const {loadPropertyAgents} = require('../api_services/agents_handler');
const {appSchema} = require('../api_validators/schema');
const {validationMiddleware} = require('../api_validators/app_validate');
let router = express.Router()
router.get('/list/:offset/:limit', (req, res) => loadPropertyAgents(req, res))
router.get('/:id', (req, res) => {
  PropertyAgent.findById(req.params.id).then(doc => res.json({doc})).catch(e => res.sendStatus(400))
})
router.post('/create', validationMiddleware(appSchema.agents, 'body'), (req, res) => {
  PropertyAgent.create(req.body).then(doc => res.json(doc)).catch(e => res.sendStatus(400))
})
router.patch('/update/:id', (req, res) => {
  PropertyAgent.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then(doc => res.status(200).json(doc))
    .catch(e => res.status(400).json({errors: ['Unable to update property info']}))
})
router.get('list_by_organisation/:organisationID/:offset/:limit', (req, res) => {
  PropertyAgent.find({organisation: req.params.organisationID}).populate('organisation').skip(req.params.offset).limit(req.params.limit).then(doc => res.json({doc})).catch(e => res.sendStatus(400))
})
router.delete('/delete/:id', (req, res) => {
  PropertyAgent.findOneAndDelete(req.params.id).then(doc => res.json(doc)).catch(e => res.sendStatus(400));
})


module.exports = router