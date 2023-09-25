import React from "react";
import "../App.css";

const SystemRoleInput = ({ systemRole, handleRoleChange, selectedRole }) => {
  return (
    <div>
      <label className="fieldset-label">System Role Type</label>
      <select
        id="roleSelect"
        className="fieldset-select"
        value={systemRole[selectedRole].nameCode}
        onChange={handleRoleChange}
        style={{ backgroundColor: "black", color: "cyan" }}
      >
        {systemRole.map((role, index) => (
          <option key={index} value={role.nameCode}>
            {role.name}
          </option>
        ))}
      </select>
      <label className="fieldset-label">System Role</label>
      <textarea
        id="contentTextarea"
        className="fieldset-input-medium"
        type="text"
        value={systemRole[selectedRole].content}
        readOnly
        placeholder="You are a helpful assistant."
      />
    </div>
  );
};

export default SystemRoleInput;
