const departmentModel = require("../models/departmentModel");

// Create Department
const createDepartment = (req, res) => {
    const { departmentName } = req.body;

    // Validate input
    if (!departmentName) {
        return res.status(400).json({
            success: false,
            message: "Department name is required"
        });
    }

    // Check duplicate
    departmentModel.findDepartmentByName(departmentName, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        if (result.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Department already exists"
            });
        }

        // Insert department
        departmentModel.createDepartment(departmentName, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to create department",
                    error: err.message
                });
            }

            return res.status(201).json({
                success: true,
                message: "Department created successfully",
                departmentId: result.insertId
            });
        });
    });
};

// Get All Departments
const getDepartments = (req, res) => {
    departmentModel.getAllDepartments((err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        return res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });
    });
};

// Update Department
const updateDepartment = (req, res) => {
    const { id } = req.params;
    const { departmentName } = req.body;

    if (!departmentName) {
        return res.status(400).json({
            success: false,
            message: "Department name is required"
        });
    }

    departmentModel.updateDepartment(id, departmentName, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Department updated successfully"
        });
    });
};

// Delete Department
const deleteDepartment = (req, res) => {
    const { id } = req.params;

    // Check if department has employees
    departmentModel.hasEmployees(id, (err, employees) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        if (employees.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete department. Employees exist in this department."
            });
        }

        // Delete department
        departmentModel.deleteDepartment(id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Department not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Department deleted successfully"
            });
        });
    });
};

module.exports = {
    createDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
};