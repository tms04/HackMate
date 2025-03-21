import express from "express"
import { auth } from "../middlewares/auth.js"
import { createTeam } from "../controllers/team.controller.js";
import { addTeamMember } from "../controllers/team.controller.js";
const router = express.Router();

router.post("/createTeam", auth, createTeam);
router.post("/addTeamMember", auth, addTeamMember);

export default router;