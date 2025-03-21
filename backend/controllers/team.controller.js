import {Team} from "../models/team.model.js"

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