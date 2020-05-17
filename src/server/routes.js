const express = require('express')
const EmployeesController = require('./controllers/EmployeesController')
const PostingsController = require('./controllers/PostingsController')

const routes = express.Router()

routes.get('/employees', EmployeesController.index)
routes.get('/employees/infos', EmployeesController.indexEmployees)
routes.get('/postings', PostingsController.index)

routes.post('/employees', EmployeesController.create)
routes.post('/postings', PostingsController.create)

module.exports = routes
