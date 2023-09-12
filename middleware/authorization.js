
module.exports = (...role) => {

    return (req, res, next) => {
        const userRole = req.user.Role;
        if (!role.includes(userRole)) {
            return res.status(403).json({
                statusbar: 403,
                status: "Fail",
                error: "You are not authorized to access this"
            });
        }

        next();
    };
};