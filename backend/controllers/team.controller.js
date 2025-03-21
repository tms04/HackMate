import {Team} from "../models/team.model.js"

// Creating a Team 
export const createTeam = async(req, res) => {
    try {
        const { teamName, maxSize, hackathonName, mode, location, startDate, endDate, domains} = req.body;
        const teamLeader = req.user.id;
        // Check if leader has already created a team in the same hackathon
        const existingTeam = await Team.findOne({ hackathonName, teamLeader });
        if (existingTeam) {
            return res.status(400).json({ message: "Team leader has already created a team for this hackathon." });
        }
        const teamMembers = [teamLeader];
        const newTeam = new Team({
            teamName,
            maxSize,
            hackathonName,
            mode,
            location: mode === "Offline" ? location : null,
            startDate,
            endDate,
            domains,
            teamMembers,
            teamLeader,
        });

        // 7️⃣ Save to database
        await newTeam.save();

        return res.status(201).json({
            message: "Team created successfully",
            team: newTeam
        });

    } catch (error) {
        console.log("Error in createTeam controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Adding a Team Member to the team
export const addTeamMember = async (req, res) => {
    try {
        const { teamId, requesterId } = req.body;
        const leaderId = req.user.id; // Leader's ID from auth middleware

        // Find the team
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        // Ensure the request is handled by the team leader
        if (team.teamLeader.toString() !== leaderId) {
            return res.status(403).json({ message: "Only the team leader can accept members" });
        }

        // Check if the requester already exists in the team
        if (team.teamMembers.includes(requesterId)) {
            return res.status(400).json({ message: "User is already a member of this team" });
        }

        // Check if the team is full
        if (team.teamMembers.length >= team.maxSize) {
            return res.status(400).json({ message: "Team is already full" });
        }

        // Add requester to team members
        team.teamMembers.push(requesterId);
        await team.save();

        return res.status(200).json({ 
            message: "Member added successfully",
            team
        });

    } catch (error) {
        console.log("Error in addTeamMember controller", error.message);
        res.status(500).json({ error: "Error in addTeamMember Internal server error" });
    }
};