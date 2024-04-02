const express = require("express");
const router = express.Router();
const { checkRole } = require("../middlewares/checkRoles.middleware.js");

const taskController = require("../controllers/taskController");
const projectController = require("../controllers/projectController");

router.post("/projects", checkRole("Admin"), projectController.createProject);

router.post("/add", checkRole("Manager"), taskController.addTask);
router.get("/tasks", checkRole("Manager"), taskController.getAllTasks);
router.put("/edit/:id", checkRole("Manager"), taskController.editTask);

router.put("/:id", checkRole("Developer"), taskController.statusChange);
router.delete("/:id", checkRole("Manager"), taskController.deleteTask);

module.exports = router;
