const express = require('express');
const PropertyItem = require('../models/property_item')
const {loadPropertyListings} = require('../api_services/property_handler');
const {validationMiddleware} = require('../api_validators/app_validate');
const {appSchema} = require('../api_validators/schema');
let router = express.Router()
router.get('/list/:offset/:limit', (req, res) => loadPropertyListings(req, res))
router.get('/:id', (req, res) => {
  PropertyItem.findById(req.params.id).then(doc => res.json({doc})).catch(e => res.sendStatus(400))
})
router.get('/list_by_agent/:agentID/:offset/:limit', (req, res) => {
  PropertyItem.find({agent: req.params.agentID}).populate('agent').skip(req.params.offset).limit(req.params.limit).then(doc => res.json({doc})).catch(e => res.sendStatus(400))
})
router.get('/list_by_organisation/:organisationID/:offset/:limit', (req, res) => {
  PropertyItem.find({organisation: req.params.organisationID}).populate('organisation').skip(req.params.offset).limit(req.params.limit).then(doc => res.json({doc})).catch(e => res.sendStatus(400))
})
router.post('/create', validationMiddleware( appSchema.propertyItem, 'body'),(req, res) => {
  PropertyItem.create(req.body).then(doc => res.json(doc)).catch(e => res.sendStatus(400))
})
router.patch('/update/:id', (req, res) => {
  PropertyItem.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then(doc => res.status(200).json(doc))
    .catch(e => res.status(400).json({errors: ['Unable to update property info']}))
})
router.delete('/delete/:id', (req, res) => {
  PropertyItem.findOneAndDelete(req.params.id).then(doc => res.json(doc)).catch(e => res.sendStatus(400));
})


module.exports = router