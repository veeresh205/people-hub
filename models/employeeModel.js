const db = require("../config/db");

// Check employee code
const findEmployeeCode = (employeeCode, callback) => {
    const sql = "SELECT * FROM employees WHERE employeeCode = ?";
    db.query(sql, [employeeCode], callback);
};

// Check email
const findEmail = (email, callback) => {
    const sql = "SELECT * FROM employees WHERE email = ?";
    db.query(sql, [email], callback);
};

// Check department exists
const findDepartment = (departmentId, callback) => {
    const sql = "SELECT * FROM departments WHERE id = ?";
    db.query(sql, [departmentId], callback);
};

// Insert employee
const createEmployee = (employeeData, callback) => {
    const sql = `
        INSERT INTO employees
        (employeeCode, fullName, email, mobile, departmentId, designation, salary)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        employeeData.employeeCode,
        employeeData.fullName,
        employeeData.email,
        employeeData.mobile,
        employeeData.departmentId,
        employeeData.designation,
        employeeData.salary
    ], callback);
};

// Get Employees with pagination, search and filters
const getEmployees = (search, departmentId, status, limit, offset, callback) => {

    let sql = `
        SELECT
            employees.*,
            departments.departmentName
        FROM employees
        LEFT JOIN departments
        ON employees.departmentId = departments.id
        WHERE 1=1
    `;

    const values = [];

    if (search) {
        sql += " AND (employees.fullName LIKE ? OR employees.employeeCode LIKE ?)";
        values.push(`%${search}%`, `%${search}%`);
    }

    if (departmentId) {
        sql += " AND employees.departmentId = ?";
        values.push(departmentId);
    }

    if (status) {
        sql += " AND employees.status = ?";
        values.push(status);
    }

    sql += " ORDER BY employees.id DESC LIMIT ? OFFSET ?";

    values.push(limit, offset);

    db.query(sql, values, callback);
};

// Find employee by ID
const findEmployeeById = (id, callback) => {
    const sql = "SELECT * FROM employees WHERE id = ?";
    db.query(sql, [id], callback);
};

// Update employee
const updateEmployee = (id, employeeData, callback) => {
    const sql = `
        UPDATE employees
        SET
            fullName = ?,
            email = ?,
            mobile = ?,
            departmentId = ?,
            designation = ?,
            salary = ?,
            status = ?
        WHERE id = ?
    `;

    db.query(sql, [
        employeeData.fullName,
        employeeData.email,
        employeeData.mobile,
        employeeData.departmentId,
        employeeData.designation,
        employeeData.salary,
        employeeData.status,
        id
    ], callback);
};
// Delete employee
const deleteEmployee = (id, callback) => {
    const sql = "DELETE FROM employees WHERE id = ?";
    db.query(sql, [id], callback);
};
// Get employee by ID with department name
const getEmployeeById = (id, callback) => {

    const sql = `
        SELECT
            employees.*,
            departments.departmentName
        FROM employees
        LEFT JOIN departments
        ON employees.departmentId = departments.id
        WHERE employees.id = ?
    `;

    db.query(sql, [id], callback);
};
// Update employee status
const updateEmployeeStatus = (id, status, callback) => {

    const sql = `
        UPDATE employees
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], callback);
};

module.exports = {
    findEmployeeCode,
    findEmail,
    findDepartment,
    createEmployee,
    getEmployees,
    findEmployeeById,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    updateEmployeeStatus
};