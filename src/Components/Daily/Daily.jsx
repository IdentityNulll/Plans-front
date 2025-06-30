import React, { useEffect, useState } from "react";
import "./Daily.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Daily() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await fetch("http://localhost:3000/logs");
    const data = await res.json();
    setLogs(data);
  };

  const updateStatus = async (index, newStatus) => {
    const updated = [...logs];
    updated[index].status = newStatus;

    await fetch(`http://localhost:3000/update/${index}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setLogs(updated);
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
      {logs.length > 0 && (
        <>
          <h2>{logs[0].date}:</h2>
          <div className="daily-header">
            <span>📝 Task</span>
            <span>⏰ Time</span>
            <span>📊 Status</span>
          </div>
        </>
      )}

      {logs.map((log, index) => (
        <div key={index} className="task-row">
          <span>{log.task}</span>
          <span>{log.time}</span>
          <div className="status-cell">
            {log.status === "" ? (
              <div className="choice-buttons">
                <button onClick={() => updateStatus(index, "yes")}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button onClick={() => updateStatus(index, "no")}>
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
            ) : (
              <div className="final-choice">
                <span>
                  {log.status === "yes" ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faX} />
                  )}
                </span>{" "}
                <button
                  className="restart-btn"
                  onClick={() => updateStatus(index, "")}
                >
                  🔄
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Daily;
