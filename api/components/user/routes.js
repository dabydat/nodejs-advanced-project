import express from "express";

import RESPONSE from "../../../network/response.js";
import User from "./controller.js";

const USER_ROUTER = express.Router();

USER_ROUTER.get("/", async (req, res) => {
    try {
        const users = await User.getAll(req, res);
        RESPONSE.success(req, res, users, 200);
    } catch (error) {
        RESPONSE.error(req, res, error.message, 500);
    }
});

USER_ROUTER.get("/:id", async (req, res) => {
    try {
        const user = await User.getOne(req, res);
        RESPONSE.success(req, res, user, 200);
    } catch (error) {
        RESPONSE.error(req, res, error.message, 500);
    }
});

USER_ROUTER.post("/", (req, res) => {
    try {
        const user = User.create(req, res);
        RESPONSE.success(req, res, user, 201);
    } catch (error) {
        RESPONSE.error(req, res, error.message, 500);
    }

});

USER_ROUTER.delete("/:id", (req, res) => {
    try {
        const user = User.removeOne(req, res);
        RESPONSE.success(req, res, user, 200);
    } catch (error) {
        RESPONSE.error(req, res, error.message, 500);
    }
});

export default USER_ROUTER;