const connection = require('../database/connection')

module.exports = {
  async index(req, res) {
    const employees = await connection('employees').select('*')
    return res.json(employees)
  },

  async create(req, res) {
    const { name } = req.body

    await connection('employees').insert({ name })

    return res.status(201).send()
  },
}
