const db = require("../config/db");

// Dashboard statistics
const getDashboardData = (callback) => {

    const sql = `
        SELECT
            (SELECT COUNT(*) FROM employees) AS totalEmployees,
            (SELECT COUNT(*) FROM employees WHERE status='Active') AS activeEmployees,
            (SELECT COUNT(*) FROM employees WHERE status='Inactive') AS inactiveEmployees,
            (SELECT COUNT(*) FROM departments) AS totalDepartments
    `;

    db.query(sql, callback);
};

module.exports = {
    getDashboardData
};