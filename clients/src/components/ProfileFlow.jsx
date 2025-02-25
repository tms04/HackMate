import Xarrow from "react-xarrows";

export default function ProfileFlow() {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Profile */}
      <div id="profile" className="p-4 bg-gray-200 rounded-lg text-center">
        Profile Image
      </div>

      {/* Role Containers */}
      <div className="flex space-x-6">
        <div id="frontend" className="p-2 bg-blue-200 rounded-md">Frontend</div>
        <div id="backend" className="p-2 bg-green-200 rounded-md">Backend</div>
        <div id="appdev" className="p-2 bg-purple-200 rounded-md">App Dev</div>
      </div>

      {/* Arrows */}
      <Xarrow start="profile" end="frontend" />
      <Xarrow start="profile" end="backend" />
      <Xarrow start="profile" end="appdev" />
    </div>
  );
}
