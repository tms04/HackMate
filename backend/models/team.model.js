import mongoose, { model, Schema } from "mongoose";
 
const teamSchema = new mongoose.Schema(
    {
        teamName: {
            type: String,
            required: true,
        },
        maxSize: {
            type: Number,
            required: true,
        },
        hackathonName: {
            type: String,
            required: true,
        },
        mode: {
            type: String,
            enum: ["Online", "Offline"],
            required: true,
        },
        location: {
            type: String,
            validate: {
                validator: function () {
                    return this.mode === "Online" || (this.mode === "Offline" && !!this.location);
                },
                message: "Location is required for offline mode."
            }
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
            validate: {
                validator: function(value) {
                  return value >= this.startDate;
                },
                message: 'End date must be after or equal to start date.'
            }
        },
        domains: {
            type: [String],
            required: true,
        },
        teamMembers: [{
            type: String,
            ref: "User"
        }],
        teamLeader: {
            type: String,
            ref: "User",
            required: true,
            unique: true,
        }
    },
    { timestamps: true }
)
 
teamSchema.index({ teamLeader: 1, hackathonName: 1 }, { unique: true });
export const Team = new mongoose.model("Team", teamSchema);