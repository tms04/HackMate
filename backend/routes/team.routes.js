import express from "express"
import { auth } from "../middlewares/auth.js"
import { acceptRequest, createTeam, deleteTeam, getAllRequests, getCreatedTeams, getJoinedTeams, leaveTeam, removeTeamMember, sendRequest, teamDetails } from "../controllers/team.controller.js";

const router = express.Router();

router.get("/:teamId", auth, teamDetails);
router.post("/createTeam", auth, createTeam);
router.post("/sendRequest", auth, sendRequest);
router.post("/acceptRequest", auth, acceptRequest);
router.post("/allRequests", auth, getAllRequests);
router.post("/removeTeamMember", auth, removeTeamMember);
router.post("/deleteTeam", auth, deleteTeam);
router.post("/leaveTeam", auth, leaveTeam);
router.get("/createdTeams/:userId", auth, getCreatedTeams);
router.get("/joinedTeams/:userId", auth, getJoinedTeams);

export default router;