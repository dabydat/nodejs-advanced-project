import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../../../config.js";
import permissionsInstance from "../permissions/controller.js";

class AuthMiddleware {
    constructor(jwt, permissions) {
        this.jwt = jwt;
        this.permissions = permissions;
    }

    checkAuth() {
        return async (req, res, next) => {
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(" ")[1];
                if (token) {
                    try {
                        const decoded = this.jwt.verify(token, JWT_CONFIG.SECRET);
                        req.user = decoded;
                        const userHasPermission = await this.checkAction(req, decoded, "selfUpdate");
                        if (userHasPermission) return next();
                        else return res.status(403).send({ message: "You don't have permission" });
                    } catch (error) {
                        return res.status(403).send({ message: "Invalid token" });
                    }
                }
            }
            return res.status(403).send({ message: "Token required" });
        }
    }

    async checkAction(req, user, action) {

        const permission = { user_id: user.id, permission: action };
        if (action === "selfUpdate" && req.body.id !== user.id) return false;
        const hasPermission = await this.permissions.verifyPermission(permission);
        if (hasPermission) return true;
        else return false;
    }

}

const authMiddlewareInstance = new AuthMiddleware(jwt, permissionsInstance);


export default authMiddlewareInstance;