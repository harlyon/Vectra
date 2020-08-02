const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  date: { type: String, required: true },
  userId: { type: String, required: true }
})

module.exports = Task = mongoose.model('task', taskSchema);