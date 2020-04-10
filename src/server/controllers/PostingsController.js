const connection = require('../database/connection')

module.exports = {
  async index(req, res) {
    const postings = await connection('postings').select('*')
    return res.json(postings)
  },
}
