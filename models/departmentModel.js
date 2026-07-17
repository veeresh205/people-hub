const db = require("../config/db");

// Check if department already exists
const findDepartmentByName = (departmentName, callback) => {
    const sql = "SELECT * FROM departments WHERE departmentName = ?";
    db.query(sql, [departmentName], callback);
};

// Create new department
const createDepartment = (departmentName, callback) => {
    const sql = "INSERT INTO departments (departmentName) VALUES (?)";
    db.query(sql, [departmentName], callback);
};

// Get all departments
const getAllDepartments = (callback) => {
    const sql = "SELECT * FROM departments ORDER BY id ASC";
    db.query(sql, callback);
};

// Update department
const updateDepartment = (id, departmentName, callback) => {
    const sql = "UPDATE departments SET departmentName = ? WHERE id = ?";
    db.query(sql, [departmentName, id], callback);
};

// Check if employees exist in a department
const hasEmployees = (departmentId, callback) => {
    const sql = "SELECT * FROM employees WHERE departmentId = ?";
    db.query(sql, [departmentId], callback);
};

// Delete department
const deleteDepartment = (departmentId, callback) => {
    const sql = "DELETE FROM departments WHERE id = ?";
    db.query(sql, [departmentId], callback);
};

module.exports = {
    findDepartmentByName,
    createDepartment,
    getAllDepartments,
    updateDepartment,
    hasEmployees,
    deleteDepartment
};