import express from "express";
import apiGeologicalTemplate from "./geologicalTemplate";

const router = express.Router();

router.use("/geological-template", apiGeologicalTemplate);

export default router;
