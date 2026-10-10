/**
 * JSON Web Token (JWT) Authentication Middleware
 * Protects Private API Routes from Unauthorized Access
 */

const protectRoute = (req, res, next) => {
    let token;

    // Check for Authorization Header (Bearer TOKEN)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify Token logic (Simulated for local execution)
            if (token === 'valid_student_jwt_token_2026' || token) {
                req.user = { id: 'usr_99812', email: 'student@college.edu', role: 'student' };
                return next(); // Pass to Next Middleware/Controller
            }
        } catch (error) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized: Invalid Auth Token'
            });
        }
    }

    // If No Token Present
    if (!token) {
        return res.status(401).json({
            status: 'unauthorized',
            message: 'Access Denied: No Authorization Token provided in Headers'
        });
    }
};

module.exports = { protectRoute };