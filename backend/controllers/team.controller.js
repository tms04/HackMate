import { Team } from "../models/team.model.js"

// Fetch Team Details
export const teamDetails = async (req, res) => {
    try {
        const { teamId } = req.params;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json(team);
    } catch (error) {
        console.error("Error fetching team details:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// Creating a Team 
export const createTeam = async (req, res) => {
    try {
        const { teamName, maxSize, hackathonName, mode, location, startDate, endDate, domains } = req.body;
        const teamLeader = req.user.id;
        // Check if leader has already created a team in the same hackathon
        const existingTeam = await Team.findOne({ hackathonName, teamLeader });
        if (existingTeam) {
            return res.status(400).json({ message: "Team leader has already created a team for this hackathon." });
        }
        const teamMembers = [teamLeader];
        const requestedTeamMembers = [];
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
            requestedTeamMembers,
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
        res.status(500).json({ error: "Internal server error in createTeamController" });
    }
}

// Delete a Team
export const deleteTeam = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.user.id; // Authenticated user ID

        // Find the team
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found." });
        }

        // Check if the user is the team leader
        if (team.teamLeader.toString() !== userId) {
            return res.status(403).json({ message: "Only the team leader can delete the team." });
        }

        // Delete the team
        await Team.findByIdAndDelete(teamId);

        return res.status(200).json({ message: "Team deleted successfully." });
    } catch (error) {
        console.error("Error in deleteTeam controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

//Leave a Team
export const leaveTeam = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.user.id; // Authenticated user ID
        // Find the team
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found." });
        }

        // Check if the user is in the team
        if (!team.teamMembers.includes(userId)) {
            return res.status(400).json({ message: "User is not a member of this team." });
        }

        // Remove the user from teamMembers
        team.teamMembers = team.teamMembers.filter(member => member.toString() !== userId);
        await team.save();

        return res.status(200).json({ message: "You have successfully left the team." });
    } catch (error) {
        console.error("Error in leaveTeam controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Adding a Team Member to the team
export const sendRequest = async (req, res) => {
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
            return res.status(403).json({ message: "Only the team leader can add members" });
        }

        // Check if the requester is already registered in another team for the same hackathon
        const existingTeam = await Team.findOne({
            hackathonName: team.hackathonName,
            teamMembers: requesterId
        });

        if (existingTeam) {
            return res.status(400).json({ message: "User is already in a team for this hackathon" });
        }

        // Check if the requester already exists in the team
        if (team.teamMembers.includes(requesterId)) {
            return res.status(400).json({ message: "User is already a member of this team" });
        }

        // Check if the request has already been sent to the user once
        if (team.requestedTeamMembers.includes(requesterId)) {
            return res.status(400).json({ message: "User has been already sent the request once" });
        }

        // Check if the team is full
        if (team.teamMembers.length >= team.maxSize) {
            return res.status(400).json({ message: "Team is already full" });
        }

        // Add requester to team members
        team.requestedTeamMembers.push(requesterId);
        await team.save();

        return res.status(200).json({
            message: "Member added to requestedTeamMembers successfully",
            team
        });

    } catch (error) {
        console.log("Error in sendRequest controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllRequests = async (req, res) => {
    try {
        const userId = req.user.id; // Logged-in user ID
        console.log("Fetching requests for user:", userId);

        // Find teams where the user is in requestedTeamMembers
        const teams = await Team.find({
            requestedTeamMembers: { $in: [userId] }
        }).select("_id teamName teamLeader");

        console.log("Teams found:", teams);

        if (!teams || teams.length === 0) {
            console.log("No pending requests found for user:", userId);
            return res.status(200).json({
                message: "No pending requests",
                requests: []
            });
        }

        console.log(`Found ${teams.length} pending requests for user:`, userId);
        return res.status(200).json({
            message: "Pending team join requests fetched successfully",
            requests: teams
        });

    } catch (error) {
        console.error("Error in getAllRequests controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const acceptRequest = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.user.id; // User accepting the request

        // Find the team
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        // Check if the user has a pending request
        if (!team.requestedTeamMembers.includes(userId)) {
            return res.status(400).json({ message: "No pending request found for this user" });
        }

        // Check if the team is already full
        if (team.teamMembers.length >= team.maxSize) {
            return res.status(400).json({ message: "Team is already full" });
        }

        // Remove user from requestedTeamMembers
        team.requestedTeamMembers = team.requestedTeamMembers.filter(id => id.toString() !== userId);

        // Add user to teamMembers
        team.teamMembers.push(userId);
        await team.save();

        return res.status(200).json({
            message: "User successfully added to the team",
            team
        });

    } catch (error) {
        console.error("Error in acceptRequest controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Add this new controller function for declining team invitations
export const declineRequest = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.user.id; // User declining the request

        // Find the team
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        // Check if the user has a pending request
        if (!team.requestedTeamMembers.includes(userId)) {
            return res.status(400).json({ message: "No pending request found for this user" });
        }

        console.log("Before update:", {
            requestedTeamMembers: team.requestedTeamMembers
        });

        // Remove user from requestedTeamMembers
        team.requestedTeamMembers = team.requestedTeamMembers.filter(id => id.toString() !== userId);

        await team.save();

        return res.status(200).json({
            message: "Invitation declined successfully",
            team
        });

    } catch (error) {
        console.error("Error in declineRequest controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Removing a Team Member from the team
export const removeTeamMember = async (req, res) => {
    try {
        const { teamId, requesterId } = req.body;
        const leaderId = req.user.id; // Leader's ID from auth middleware
        console.log("Received Request - teamId:", teamId, "requesterId:", requesterId, "leaderId:", leaderId);

        // Find the team
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        // Ensure the request is handled by the team leader
        if (team.teamLeader.toString() !== leaderId) {
            return res.status(403).json({ message: "Only the team leader can remove members" });
        }

        // Check if the user is in the team
        if (!team.teamMembers.includes(requesterId)) {
            return res.status(400).json({ message: "User is not a member of this team" });
        }

        // Remove the member from the team correctly
        team.teamMembers = team.teamMembers.filter(member => member.toString() !== requesterId);
        await team.save();

        return res.status(200).json({
            message: "Member removed successfully",
            team
        });

    } catch (error) {
        console.log("Error in removeTeamMember controller", error.message);
        res.status(500).json({ error: "Internal server error in removeTeamMember controller" });
    }
};


//Get all teams created by the user
export const getCreatedTeams = async (req, res) => {
    try {
        const { userId } = req.params;
        const teams = await Team.find({ teamLeader: userId }).populate("teamMembers", "name");

        return res.status(200).json({
            message: "Created Teams by the user",
            teams
        });
    } catch (error) {
        console.log("Error in removeTeamMember controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

//Get all teams created by the user
export const getJoinedTeams = async (req, res) => {
    try {
        const { userId } = req.params;
        // Find teams where the user is in teamMembers but is not the teamLeader
        const teams = await Team.find({
            teamMembers: { $in: [userId] },
            teamLeader: { $ne: userId }
        }).populate("teamMembers", "name");

        return res.status(200).json({
            message: "Joined teams retrieved successfully",
            teams
        });

    } catch (error) {
        console.log("Error in getJoinedTeams controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};