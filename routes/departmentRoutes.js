const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/departmentController");

// Create Department
router.post("/", departmentController.createDepartment);

// Get All Departments
router.get("/", departmentController.getDepartments);

// Update Department
router.put("/:id", departmentController.updateDepartment);

// Delete Department
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;