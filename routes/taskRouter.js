const router = require("express").Router();
const auth = require("../middleware/auth");
const task = require('../models/taskModel');

router.post('/', auth, async(req, res) => {
  try {
    const { title, description, status, priority, date } = req.body;
    if (!title || !description || !status || !priority || !date)
    return res.status(400).json({ msg: "Not all fields have been entered." });
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      date,
      userId: req.user
    })
    const savedTask = await newTask.save()
    res.json(savedTask)

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', auth, async(req, res) => {
  const tasks = await task.find({userId: req.user});
  res.json(tasks);
});

router.delete('/:id', auth, async(req, res) => {
  const task = await Task.findOne({userId: req.user, _id: req.params.id });
  if(!task) {
    return res.status(400).json({ msg: "No task belonging to this user found." });
  }
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  res.json(deletedTask)
})

router.put('/:id', auth, async(req, res) => {
  const task = await task.find({ userId: req.user });
  const updatedTask = await Task.findByIdAndUpdate(req.params.id);
  res.json(updatedTask);
})

module.exports = router;