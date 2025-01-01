import express from "express";

import authMiddlewareInstance from "./middleware.js";

import RESPONSE from "../../../network/response.js";
import userInstance from "./controller.js";

const USER_ROUTER = express.Router();

USER_ROUTER.get("/", async (req, res) => {
    try {
        const users = await userInstance.getAll(req, res);
        RESPONSE.success(req, res, users, 200);
    } catch (error) {
        RESPONSE.error(req, res, error.message, 500);
    }
});

USER_ROUTER.get("/:id", async (req, res) => {
    try {
        const user = await userInstance.getOne(req, res);
        RESPONSE.success(req, res, user, 200);
    } catch (error) {
        RESPONSE.error(req, res, error.message, 500);
    }
});

USER_ROUTER.post("/", async (req, res) => {
    try {
        const user = await userInstance.create(req, res);        
        RESPONSE.success(req, res, user, 201);
    } catch (error) {
        RESPONSE.error(req, res, error.message, 500);
    }

});

USER_ROUTER.put("/", authMiddlewareInstance.checkAuth(), async (req, res) => {
    try {
        const user = await userInstance.create(req, res);
        RESPONSE.success(req, res, user, 201);
    } catch (error) {
        RESPONSE.error(req, res, error.message, 500);
    }

});

USER_ROUTER.delete("/:id", (req, res) => {
    try {
        const user = userInstance.removeOne(req, res);
        RESPONSE.success(req, res, user, 200);
    } catch (error) {
        RESPONSE.error(req, res, error.message, 500);
    }
});

export default USER_ROUTER;