import Notification from "../components/Requests/Notification";

const notificationsData = [
  { teamMember: "Mary Palmer", teamName: "Code Masters", hackathonName: "HackFest 2025", location: "San Francisco, CA", dates: "March 10-12, 2025", roles: ["Frontend Developer", "UI/UX Designer"] },
  { teamMember: "John Doe", teamName: "Innovators", hackathonName: "AI Challenge", location: "New York, NY", dates: "April 5-7, 2025", roles: ["Backend Developer"] },
  { teamMember: "Alice Smith", teamName: "Tech Pioneers", hackathonName: "Blockchain Summit", location: "Los Angeles, CA", dates: "May 20-22, 2025", roles: ["Smart Contract Developer"] },
  { teamMember: "Bob Johnson", teamName: "NextGen Coders", hackathonName: "CyberSec Hack", location: "Seattle, WA", dates: "June 15-17, 2025", roles: ["Security Analyst"] },
  { teamMember: "Charlie Lee", teamName: "Byte Busters", hackathonName: "Game Dev Jam", location: "Austin, TX", dates: "July 10-12, 2025", roles: ["Game Developer", "3D Artist"] },
  { teamMember: "Emma Wilson", teamName: "Deep Learning Squad", hackathonName: "ML Hackathon", location: "Boston, MA", dates: "August 25-27, 2025", roles: ["ML Engineer"] },
  { teamMember: "Liam Brown", teamName: "Cloud Ninjas", hackathonName: "Cloud Challenge", location: "Chicago, IL", dates: "September 5-7, 2025", roles: ["Cloud Architect"] }
];

const Notifications = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-base-200 min-h-screen">
      <h2 className="text-xl font-bold text-base-content">Hackathon Invitations</h2>
      <div className="flex flex-col gap-4 w-full max-w-md">
        {notificationsData.map((notification, index) => (
          <Notification key={index} {...notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;