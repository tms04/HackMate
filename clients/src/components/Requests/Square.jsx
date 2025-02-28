/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const CurvedTriangle = ({ teamMember, teamName, hackathonName, location, dates, roles }) => {
    return (
 <>
  <div className="chat chat-start [transform:rotateX(180deg)] w-full">
  <div className="chat-bubble w-full max-w-3xl">
   <div className="[transform:rotateX(180deg)]">
   <div className="flex items-center gap-3 mb-3">
  <img
    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" // Replace with actual image URL
    alt={teamMember}
    className="w-10 h-10 rounded-full"
  />
  <div className="text-sm">
    <p className="font-semibold">Saurabhkumar Sharma</p>
    <p className="text-xs text-gray-400">TY | IT | Male</p>
    <p>Code&Adapt</p>
  </div>
</div>
   </div>
  </div>
</div>

     
      </>)
  };
  
  export default CurvedTriangle;
  