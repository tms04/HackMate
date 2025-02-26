/* eslint-disable react/prop-types */
import { useState } from "react";

const RoleInput = ({ roles, setRoles, roleOptions }) => {
  const [customRole, setCustomRole] = useState("");

  const handleSelection = (item) => {
    setRoles(
      roles.includes(item) ? roles.filter((i) => i !== item) : [...roles, item]
    );
  };

  const handleRemoveRole = (role) => {
    setRoles(roles.filter((r) => r !== role));
  };

  return (
    <div className="form-control">
      <label className="label">Role</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {roleOptions.map((role) => (
          <button
            key={role}
            type="button"
            className={`btn w-full ${
              roles.includes(role) ? "btn-accent" : "btn-outline"
            }`}
            onClick={() => handleSelection(role)}
          >
            {role}
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          placeholder="Other role"
          className="input input-bordered flex-grow"
          value={customRole}
          onChange={(e) => setCustomRole(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-neutral"
          onClick={() => {
            if (customRole.trim()) {
              setRoles([...roles, customRole]);
              setCustomRole("");
            }
          }}
        >
          Add
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {roles.map((role, index) => (
          <span
            key={index}
            className="badge badge-neutral flex justify-between items-center gap-1 px-2 py-4 cursor-pointer"
            onClick={() => handleRemoveRole(role)}
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RoleInput;
