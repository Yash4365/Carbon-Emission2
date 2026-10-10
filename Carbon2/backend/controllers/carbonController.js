// Simulated In-Memory Database Table for Carbon Logs
let carbonLogsTable = [
    { id: 1, date: "2026-09-01", electricity: 200, vehicle: 250, flight: 0, diet: "medium-meat", waste: 30, totalCO2: 428.0 },
    { id: 2, date: "2026-10-01", electricity: 220, vehicle: 310, flight: 3, diet: "medium-meat", waste: 40, totalCO2: 714.5 }
];

// Calculate Emission Payload
exports.calculateEmission = (req, res) => {
    try {
        const { electricity = 0, vehicle = 0, flight = 0, diet = "medium-meat", waste = 0 } = req.body;

        const dietFactors = { "high-meat": 250, "medium-meat": 180, "vegetarian": 100, "vegan": 70 };

        const electricityCO2 = Number(electricity) * 0.85;
        const vehicleCO2 = Number(vehicle) * 0.192;
        const flightCO2 = Number(flight) * 90;
        const dietCO2 = dietFactors[diet] || 180;
        const wasteCO2 = Number(waste) * 0.45;

        const totalCO2 = Number((electricityCO2 + vehicleCO2 + flightCO2 + dietCO2 + wasteCO2).toFixed(2));

        const newLog = {
            id: carbonLogsTable.length + 1,
            date: new Date().toISOString().split('T')[0],
            electricity, vehicle, flight, diet, waste,
            totalCO2
        };

        carbonLogsTable.unshift(newLog);

        return res.status(200).json({
            status: "success",
            message: "Calculated & saved to database",
            data: newLog
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

// Fetch All Database Logs
exports.getAllLogs = (req, res) => {
    return res.status(200).json({
        status: "success",
        count: carbonLogsTable.length,
        data: carbonLogsTable
    });
};