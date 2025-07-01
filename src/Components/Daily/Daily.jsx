import React, { useEffect, useState } from "react";
import "./Daily.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faRotateRight, faTrash } from "@fortawesome/free-solid-svg-icons";


function Daily() {
  const [groupedLogs, setGroupedLogs] = useState({});

  const fetchLogs = async () => {
    const res = await fetch("http://localhost:3000/logs");
    const data = await res.json(); // { "30.06.2025": [{task, time, status, index}, ...] }
    setGroupedLogs(data);
  };

  const updateStatus = async (index, newStatus) => {
    await fetch(`http://localhost:3000/update/${index}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchLogs(); // refresh UI
  };

  const deleteTask = async (index) => {
    await fetch(`http://localhost:3000/delete/${index}`, {
      method: "DELETE",
    });
    fetchLogs();
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="daily-container">
      {Object.keys(groupedLogs).map((date) => (
        <div key={date}>
          <h2>{date}:</h2>
          <div className="daily-header">
            <span>Task</span>
            <span>Time</span>
            <span>Status</span>
          </div>

          {groupedLogs[date].map((log) => (
            <div key={log.index} className="task-row">
              <span className="task-output">{log.task}</span>
              <span className="time-output">{log.time}</span>
              <div className="status-cell">
                {log.status === "" ? (
                  <div className="choice-buttons">
                    <button onClick={() => updateStatus(log.index, "yes")}>
                      <FontAwesomeIcon icon={faCheck} className="tick"/>
                    </button>
                    <button onClick={() => updateStatus(log.index, "no")}>
                      <FontAwesomeIcon icon={faX} className="x"/>
                    </button>
                  </div>
                ) : (
                  <div className="final-choice">
                    <span>
                      {log.status === "yes" ? (
                        <FontAwesomeIcon icon={faCheck} className="tick"/>
                      ) : (
                        <FontAwesomeIcon icon={faX} className="x" />
                      )}
                    </span>
                    <button onClick={() => updateStatus(log.index, "")}>
                      <FontAwesomeIcon icon={faRotateRight} className="restart"/>
                    </button>
                    <button onClick={() => deleteTask(log.index)}>
                      <FontAwesomeIcon icon={faTrash} className="delete"/>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Daily;
