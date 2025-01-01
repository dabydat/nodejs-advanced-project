import express from "express";

import RESPONSE from "../../../network/response.js";
import authInstance from "../auth/controller.js";

const AUTH_ROUTER = express.Router();

AUTH_ROUTER.post("/login", async (req, res) => {
    try {
        const user = await authInstance.login(req.body.username, req.body.password);
        RESPONSE.success(req, res, user, 200);
    } catch (error) {
        RESPONSE.error(req, res, "Invalid username or password", 400);
    }
});

AUTH_ROUTER.get("/", async (req, res) => {
    try {
        const user = await authInstance.getAll();
        RESPONSE.success(req, res, user, 200);
    } catch (error) {
        RESPONSE.error(req, res, "Invalid username or password", 400);
    }
});

export default AUTH_ROUTER;