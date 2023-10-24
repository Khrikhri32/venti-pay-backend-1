const { create, getAll } = require("../services/users.service");
const handleResponse = (res, err, results, status = 200) => {
  if (err) {
    console.error(err);
    return res.status(500).json({ data: results });
  }
  return res.status(status).json({ data: results });
};

module.exports = {
  createUser(req, res) {
    const body = req.body;
    create(body, (err, results) => handleResponse(res, err, results))
  },
  getUsers(req, res) {
    getAll((err, results) => handleResponse(res, err, results))
  },
}