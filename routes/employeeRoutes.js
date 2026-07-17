const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");

// Employee APIs
router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getEmployees);
router.get("/export", employeeController.exportEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);
router.patch("/:id/status", employeeController.updateEmployeeStatus);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;