import express from "express"
import { auth } from "../middlewares/auth.js"
import { createTeam } from "../controllers/team.controller.js";
import { addTeamMember } from "../controllers/team.controller.js";
import { removeTeamMember } from "../controllers/team.controller.js";
import { deleteTeam } from "../controllers/team.controller.js";

const router = express.Router();

router.post("/createTeam", auth, createTeam);
router.post("/addTeamMember", auth, addTeamMember);
router.post("/removeTeamMember", auth, removeTeamMember);
router.post("/deleteTeam", auth, deleteTeam);

export default router;