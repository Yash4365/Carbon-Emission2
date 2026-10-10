/**
 * Carbon Emission Log Schema & Math Calculation Engine
 */

class CarbonLogModel {
    constructor(data) {
        this.userId = data.userId || 'guest_user';
        this.electricity = Number(data.electricity) || 0;
        this.vehicle = Number(data.vehicle) || 0;
        this.flight = Number(data.flight) || 0;
        this.diet = data.diet || 'medium-meat';
        this.waste = Number(data.waste) || 0;
        this.createdAt = new Date();
    }

    // Emission Calculation Business Logic
    calculateTotalEmissions() {
        const dietFactors = {
            'high-meat': 250,
            'medium-meat': 180,
            'vegetarian': 100,
            'vegan': 70
        };

        const eCO2 = this.electricity * 0.85;   // kWh to kg CO2
        const vCO2 = this.vehicle * 0.192;      // km to kg CO2
        const fCO2 = this.flight * 90.0;        // hours to kg CO2
        const dCO2 = dietFactors[this.diet] || 180;
        const wCO2 = this.waste * 0.45;         // kg waste to kg CO2

        const total = eCO2 + vCO2 + fCO2 + dCO2 + wCO2;

        return {
            totalCO2: Number(total.toFixed(2)),
            breakdown: {
                electricity: Number(eCO2.toFixed(2)),
                vehicle: Number(vCO2.toFixed(2)),
                flight: Number(fCO2.toFixed(2)),
                diet: Number(dCO2.toFixed(2)),
                waste: Number(wCO2.toFixed(2))
            }
        };
    }
}

module.exports = CarbonLogModel;