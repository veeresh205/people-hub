const dashboardModel = require("../models/dashboardModel");

// Get Dashboard Data
const getDashboardData = (req, res) => {

    dashboardModel.getDashboardData((err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        return res.status(200).json({
            success: true,
            data: result[0]
        });

    });

};

module.exports = {
    getDashboardData
};