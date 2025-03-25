import express from "express"
import { auth } from "../middlewares/auth.js"
import { acceptRequest, createTeam, deleteTeam, getAllRequests, getCreatedTeams, getJoinedTeams, leaveTeam, removeTeamMember, sendRequest, teamDetails, declineRequest } from "../controllers/team.controller.js";
import { Team } from "../models/team.model.js";

const router = express.Router();

router.get("/:teamId", auth, teamDetails);
router.post("/createTeam", auth, createTeam);
router.post("/sendRequest", auth, sendRequest);
router.post("/acceptRequest", auth, acceptRequest);
router.post("/declineRequest", auth, declineRequest);
router.post("/allRequests", auth, getAllRequests);
router.post("/removeTeamMember", auth, removeTeamMember);
router.post("/deleteTeam", auth, deleteTeam);
router.post("/leaveTeam", auth, leaveTeam);
router.get("/createdTeams/:userId", auth, getCreatedTeams);
router.get("/joinedTeams/:userId", auth, getJoinedTeams);

// Add a testing endpoint
router.post("/create-test-invitation", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Create a test team with the current user as a requested member
    const testTeam = new Team({
      teamName: "Test Team",
      maxSize: 5,
      hackathonName: "Test Hackathon",
      mode: "Online",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week later
      domains: ["Testing", "Debugging"],
      teamMembers: [], // No members initially
      requestedTeamMembers: [userId], // Add the current user as a requested member
      teamLeader: "6602f00d3a991833b8357610", // Fixed team leader ID - replace with a valid ID
    });
    
    await testTeam.save();
    
    res.status(201).json({
      message: "Test invitation created successfully",
      team: testTeam
    });
  } catch (error) {
    console.error("Error creating test invitation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;