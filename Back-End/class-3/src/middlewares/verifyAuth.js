import jwt from "jsonwebtoken";

const verifyAuthentication = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        console.log(`Token: ${JSON.stringify(token)}`);

        if (!token || token == undefined) {
            return res?.status(400).send({
                status: false,
                message: "Token is required"
            })
        }
        const isTokenVerify = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );
        console.log(`Token status: ${JSON.stringify(token)}`);

        if (isTokenVerify) {
            next();
        }

        else {
            return res?.status(401).send({
                status: false,
                message: "Token is expired"
            })
        }
    }

    catch (error) {
        console.log(`Token err: ${error}`);
        return res?.status(500).send({
            status: 500,
            message: "Token sahi bhejo"
        })
    }
};

export default verifyAuthentication;