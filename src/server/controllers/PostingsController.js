const moment = require('moment')
const connection = require('../database/connection')

module.exports = {
  async index(req, res) {
    const { date } = req.query

    const postings = await connection('postings')
      .select('*')
      .where('createdAt', 'like', `%${moment(date).format('YYYY-MM')}%`)
    return res.json({ date: moment(date).format('YYYY-MM-DD'), postings })
  },

  async create(req, res) {
    const { description, type, value, employee, employeeId } = req.body

    // const id = await connection('employees')
    //   .where('id', employeeId)
    //   .select('id')
    //   .first()

    // if (!employeeId)
    //   return res.status(400).json({ error: 'Employee not found!' })

    await connection('postings').insert({
      description,
      type,
      value,
      employee,
      employeeId,
    })

    return res.status(201).send()
  },
}
