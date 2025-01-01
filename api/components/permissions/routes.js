import express from "express";

import RESPONSE from "../../../network/response.js";
import permissionsInstance from "../permissions/controller.js";

const PERMISSIONS_ROUTER = express.Router();

PERMISSIONS_ROUTER.get("/", async (req, res) => {
    try {
        const user = await permissionsInstance.getAll();
        RESPONSE.success(req, res, user, 200);
    } catch (error) {
        RESPONSE.error(req, res, "Internal Server Error", 500);
    }
});

export default PERMISSIONS_ROUTER;