import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = async () => {
    if (!task || !time) {
      alert("Please fill out both fields!");
      return;
    }

    const payload = {
      task,
      time,
      status: "", // not 'no'!
    };

    try {
      const res = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("✅ Sent to backend:", result);

      // Reset form
      setTask("");
      setTime("");
    } catch (err) {
      console.error("❌ Error sending to backend:", err);
    }
  };

  return (
    <header>
      <div className="header-container">
        <input
          type="text"
          placeholder="Task 🎯"
          className="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Time ⌛"
          className="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button className="add" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className="line"></div>
    </header>
  );
}

export default Header;
