import Notification from "../components/Requests/Notification";
const notificationsData = [
  { 
    teamMember: "Mary Palmer", 
    teamName: "Code Masters", 
    hackathonName: "HackFest 2025", 
    location: "San Francisco, CA", 
    dates: { from: "2025-03-10", to: "2025-05-12" }, 
    roles: ["Frontend Developer", "UI/UX Designer"] 
  },
  { 
    teamMember: "John Doe", 
    teamName: "Innovators", 
    hackathonName: "AI Challenge", 
    location: "New York, NY", 
    dates: { from: "2025-04-05", to: "2025-04-07" }, 
    roles: ["Backend Developer"] 
  },
  { 
    teamMember: "Alice Smith", 
    teamName: "Tech Pioneers", 
    hackathonName: "Blockchain Summit", 
    location: "Los Angeles, CA", 
    dates: { from: "2025-05-20", to: "2025-05-22" }, 
    roles: ["Smart Contract Developer"] 
  },
  { 
    teamMember: "Bob Johnson", 
    teamName: "NextGen Coders", 
    hackathonName: "CyberSec Hack", 
    location: "Seattle, WA", 
    dates: { from: "2025-06-15", to: "2025-06-17" }, 
    roles: ["Security Analyst"] 
  },
  { 
    teamMember: "Charlie Lee", 
    teamName: "Byte Busters", 
    hackathonName: "Game Dev Jam", 
    location: "Austin, TX", 
    dates: { from: "2025-07-10", to: "2025-07-12" }, 
    roles: ["Game Developer", "3D Artist"] 
  },
  { 
    teamMember: "Emma Wilson", 
    teamName: "Deep Learning Squad", 
    hackathonName: "ML Hackathon", 
    location: "Boston, MA", 
    dates: { from: "2025-08-25", to: "2025-08-27" }, 
    roles: ["ML Engineer"] 
  },
  { 
    teamMember: "Liam Brown", 
    teamName: "Cloud Ninjas", 
    hackathonName: "Cloud Challenge", 
    location: "Chicago, IL", 
    dates: { from: "2025-09-05", to: "2025-09-07" }, 
    roles: ["Cloud Architect"] 
  }
];

const Notifications = () => {
  return (
    
    <div className="flex flex-col items-center gap-4 p-6 bg-base-200 min-h-screen">
      <h2 className="text-xl font-bold text-base-content">Hackathon Invitations</h2>
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {notificationsData.map((notification, index) => (
          <Notification key={index} {...notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
