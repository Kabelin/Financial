const connection = require('../database/connection')

module.exports = {
  async index(req, res) {
    const employees = await connection('employees').select('*')
    return res.json(employees)
  },
}
