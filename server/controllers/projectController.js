const Project = require("../models/project.model");

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = new Project({ name, tasks: [] });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
