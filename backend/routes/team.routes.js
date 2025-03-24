import express from "express"
import { auth } from "../middlewares/auth.js"
import { createTeam } from "../controllers/team.controller.js";
import { sendRequest } from "../controllers/team.controller.js";
import { removeTeamMember } from "../controllers/team.controller.js";
import { deleteTeam } from "../controllers/team.controller.js";
import { getCreatedTeams } from "../controllers/team.controller.js";
import { getJoinedTeams } from "../controllers/team.controller.js";

const router = express.Router();

router.post("/createTeam", auth, createTeam);
router.post("/sendRequest", auth, sendRequest);
router.post("/removeTeamMember", auth, removeTeamMember);
router.post("/deleteTeam", auth, deleteTeam);
router.get("/createdTeams/:userId", auth, getCreatedTeams);
router.get("/joinedTeams/:userId", auth, getJoinedTeams);

export default router;