module.exports = (req, res, next) => {
    if (!req.isAuth) {
        throw new Error('Not authenticated');
    }

    
    // Role-based access control
    const role = req.role;
    const allowedRoles = ['Admin', 'Manager', 'User'];

    if (!allowedRoles.includes(role)) {
        throw new Error('Not authorized');
    }

    next();
};
