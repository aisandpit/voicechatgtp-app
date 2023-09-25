import React, { useState, useEffect } from "react";
import "../App.css";

const ConnectionStrengthComponent = () => {
  const [connectionType, setConnectionType] = useState("");
  const [connectionSpeed, setConnectionSpeed] = useState("");

  useEffect(() => {
    const getConnectionStrength = () => {
      if (navigator.connection) {
        const { type, downlink } = navigator.connection;
        setConnectionType(type === undefined ? "Ethernet" : type);
        setConnectionSpeed(downlink);
      }
    };

    getConnectionStrength();
  }, []);

  return (
    <div>
      <label className="fieldset-label">Connection Strength</label>
      <textarea
        id="connectionstrength"
        className="fieldset-input-small"
        type="text"
        value={`${"Type"}: ${connectionType}\n${"Speed"}: ${connectionSpeed} ${"Mbps"}`}
        readOnly
        placeholder="Connection strength."
      />
    </div>
  );
};

export default ConnectionStrengthComponent;
