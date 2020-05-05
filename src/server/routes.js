const express = require('express')
const EmployeesController = require('./controllers/EmployeesController')
const PostingsController = require('./controllers/PostingsController')

const routes = express.Router()

routes.get('/employees', EmployeesController.index)
routes.get('/postings', PostingsController.index)

routes.post('/employees', EmployeesController.create)

module.exports = routes
