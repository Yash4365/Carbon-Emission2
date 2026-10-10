/**
 * User Database Model & Schema Simulator
 */

class UserModel {
    constructor(userData) {
        this.id = 'usr_' + Math.floor(Math.random() * 90000 + 10000);
        this.name = userData.name || 'Student';
        this.email = userData.email;
        this.password = userData.password; // In real DB, this is hashed
        this.createdAt = new Date();
    }

    // Static method to simulate finding a user by email in database
    static async findOne(query) {
        // Simulated mock check
        if (query.email) {
            return {
                id: 'usr_10482',
                name: query.email.split('@')[0],
                email: query.email,
                password: '$2a$10$simulatedHashedPasswordStringForSecureStorage'
            };
        }
        return null;
    }

    // Static method to simulate saving a new user
    async save() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt
        };
    }
}

module.exports = UserModel;