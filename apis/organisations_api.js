const express = require('express');
const Organisation = require('../models/organisation')
const {loadOrganisations} = require('../api_services/organisations_handler');
const {appSchema} = require('../api_validators/schema');
const {validationMiddleware} = require('../api_validators/app_validate');
let router = express.Router()
router.get('/list/:offset/:limit', (req, res) => loadOrganisations(req, res))
router.get('/:id', (req, res) => {
  Organisation.findById(req.params.id).then(doc => res.json({doc})).catch(e => res.sendStatus(400))
})
router.post('/create', validationMiddleware(appSchema.organisation, 'body'), (req, res) => {
  Organisation.create(req.body).then(doc => res.json(doc)).catch(e => res.sendStatus(400))
})
router.patch('/update/:id', (req, res) => {
  Organisation.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then(doc => res.status(200).json(doc))
    .catch(e => res.status(400).json({errors: ['Unable to update property info']}))
})
router.delete('/delete/:id', (req, res) => {
  Organisation.findOneAndDelete(req.params.id).then(doc => res.json(doc)).catch(e => res.sendStatus(400));
})


module.exports = router