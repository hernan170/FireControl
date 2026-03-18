import express from "express";
import { getActiveFires } from "../controllers/nasaController.js";


const router = express.Router();
router.get('/incendios', getActiveFires);

export default router;