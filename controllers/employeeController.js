const employeeModel = require("../models/employeeModel");
const { Parser } = require("json2csv");

// Create Employee
const createEmployee = (req, res) => {
    const {
        employeeCode,
        fullName,
        email,
        mobile,
        departmentId,
        designation,
        salary
    } = req.body;

    // Full Name validation
    if (!fullName) {
        return res.status(400).json({
            success: false,
            message: "Full Name is required"
        });
    }

    // Mobile validation
    if (mobile && !/^[0-9]+$/.test(mobile)) {
        return res.status(400).json({
            success: false,
            message: "Mobile should contain only digits"
        });
    }

    employeeModel.findEmployeeCode(employeeCode, (err, codeResult) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        if (codeResult.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Employee Code already exists"
            });
        }

        employeeModel.findEmail(email, (err, emailResult) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });
            }

            if (emailResult.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            employeeModel.findDepartment(departmentId, (err, departmentResult) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Database error",
                        error: err.message
                    });
                }

                if (departmentResult.length === 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Department does not exist"
                    });
                }

                employeeModel.createEmployee(req.body, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Failed to create employee",
                            error: err.message
                        });
                    }

                    return res.status(201).json({
                        success: true,
                        message: "Employee created successfully",
                        employeeId: result.insertId
                    });
                });
            });
        });
    });
};

// Get Employees
const getEmployees = (req, res) => {

    const search = req.query.search || "";
    const departmentId = req.query.departmentId || "";
    const status = req.query.status || "";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    employeeModel.getEmployees(
        search,
        departmentId,
        status,
        limit,
        offset,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });
            }

            return res.status(200).json({
                success: true,
                page,
                limit,
                count: result.length,
                data: result
            });
        }
    );
};

// Update Employee
const updateEmployee = (req, res) => {

    const id = req.params.id;

    employeeModel.findEmployeeById(id, (err, employeeResult) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        if (employeeResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        employeeModel.findDepartment(req.body.departmentId, (err, departmentResult) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });
            }

            if (departmentResult.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Department does not exist"
                });
            }

            employeeModel.updateEmployee(id, req.body, (err) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Failed to update employee",
                        error: err.message
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: "Employee updated successfully"
                });

            });

        });

    });

};

// Delete Employee
const deleteEmployee = (req, res) => {

    const id = req.params.id;

    employeeModel.findEmployeeById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        employeeModel.deleteEmployee(id, (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to delete employee",
                    error: err.message
                });
            }

            return res.status(200).json({
                success: true,
                message: "Employee deleted successfully"
            });

        });

    });

};
// Get Employee By ID
const getEmployeeById = (req, res) => {

    const id = req.params.id;

    employeeModel.getEmployeeById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: result[0]
        });

    });

};
// Update Employee Status
const updateEmployeeStatus = (req, res) => {

    const id = req.params.id;
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Status must be Active or Inactive"
        });
    }

    employeeModel.findEmployeeById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        employeeModel.updateEmployeeStatus(id, status, (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to update employee status",
                    error: err.message
                });
            }

            return res.status(200).json({
                success: true,
                message: "Employee status updated successfully"
            });

        });

    });

};
// Export Employees as CSV
const exportEmployees = (req, res) => {

    employeeModel.getEmployees("", "", "", 100000, 0, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        const fields = [
            "employeeCode",
            "fullName",
            "email",
            "mobile",
            "departmentName",
            "designation",
            "salary",
            "status"
        ];

        const parser = new Parser({ fields });

        const csv = parser.parse(result);

        res.header("Content-Type", "text/csv");
        res.attachment("employees.csv");

        return res.send(csv);

    });

};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    updateEmployeeStatus,
    exportEmployees
};