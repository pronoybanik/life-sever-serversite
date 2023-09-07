const { signupService, findUserByEmail, findUserById } = require("../service/user.service");
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
        console.log(email, password);

        const user = await findUserByEmail(email);
        console.log('user', user);

        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                error: "Please provide your credentials",
            });
        }


        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "No user found. Please create an account",
            });
        }


        if (user.password !== password) {
            return res.status(403).json({
                status: "fail",
                error: "Password is not correct",
            });
        }


        if (user.status != "active") {
            return res.status(401).json({
                status: "fail",
                error: "Your account is not active yet.",
            });
        }

        const token = generateToken(user);

        const { password: pwd, confirmPassword, ...others } = user.toObject();

        res.status(200).json({
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
            status: "fail",
            error: error.message,
        });
    }
}

exports.userId = async (req, res) => {
    try {
        const { id } = req.params
        const user = await findUserById(id);
        res.status(200).json({
            statusbar: 200,
            status: "success",
            message: "Find user ID",
            data: user._id,
        });

    } catch (error) {
        res.json(500).json({
            statusbar: 500,
            status: "Fail",
            error: error.message,
        })
    }
}