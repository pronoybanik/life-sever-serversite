const { signupService, findUserByEmail, findUserById, setUserRole, getAllUserService } = require("../service/user.service");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);

        res.status(201).json({
            statusbar: 201,
            status: "success",
            message: "Successfully signed up",
        });
    } catch (error) {
        if (error?.keyPattern?.email === 1) {
            res.status(500).json({
                statusbar: 500,
                status: "Fail",
                error: "Email are allReady Exist"
            })
        } else (res.status(500).json({
            statusbar: 500,
            status: "Fail",
            error: error.message,
        }))


    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!email || !password) {
            return res.status(401).json({
                status: "Fail",
                error: "Please provide your credentials",
            });
        }


        if (!user) {
            return res.status(401).json({
                status: "Fail",
                error: "No user found. Please create an account",
            });
        }


        const isPasswordValid = user?.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({
                status: "Fail",
                error: "Password is not correct",
            });
        }


        if (user.status != "active") {
            return res.status(401).json({
                status: "Fail",
                error: "Your account is not active yet.",
            });
        }

        const token = generateToken(user);

        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            statusbar: 200,
            status: "success",
            message: "Successfully logged in",
            data: {
                user: others,
                token,
            },
        });

    } catch (error) {
        res.status(500).json({
            statusbar: 500,
            status: "Fail",
            error: error.message,
        });
    }
};

exports.userId = async (req, res) => {
    try {
        const { id } = req.params
        const user = await findUserById(id);
        const { password, createdAt, updatedAt, __v, ...other } = user.toObject();

        res.status(200).json({
            statusbar: 200,
            status: "success",
            message: "Find user ID",
            data: other,
        });
    } catch (error) {
        res.json(500).json({
            statusbar: 500,
            status: "Fail",
            error: error.message,
        })
    }
};

exports.getAllUser = async (req, res, next) => {
    try {

        const result = await getAllUserService();
        res.status(200).json({
            statusbar: 200,
            status: "success",
            message: "Data inserted successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Data is note inserted",
            error: error.message,
        });
    }
};

exports.userSetRole = async (req, res, next) => {
    try {
        const paramsId = req.params.id;
        const result = await setUserRole(paramsId, req.body);
        res.status(200).json({
            statusbar: 200,
            status: "success",
            message: "Data inserted successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Data is note inserted",
            error: error.message,
        });
    }
};
