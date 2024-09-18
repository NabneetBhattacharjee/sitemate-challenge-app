import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file for styling

function App() {
  const [issue, setIssue] = useState({});
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Create
  const createIssue = async () => {
    try {
      const newIssue = {
        title: title,
        description: description,
      };
      const response = await axios.post(
        "http://localhost:3000/issue",
        newIssue
      );
      console.log("Created Issue:", response.data);
    } catch (error) {
      console.error("Error creating issue:", error.response || error.message);
    }
  };

  // Read
  const readIssue = async () => {
    try {
      if (!id) {
        console.error("No ID provided");
        return;
      }
      const response = await axios.get(`http://localhost:3000/issue/${id}`);
      setIssue(response.data);
    } catch (error) {
      console.error("Error reading issue:", error.response || error.message);
    }
  };

  // Update
  const updateIssue = async () => {
    try {
      if (!id) {
        console.error("No ID provided");
        return;
      }
      const updatedIssue = {
        id: id,
        title: title,
        description: description,
      };
      const response = await axios.put(
        `http://localhost:3000/issue/${id}`,
        updatedIssue
      );
      console.log("Updated Issue:", response.data);
    } catch (error) {
      console.error("Error updating issue:", error.response || error.message);
    }
  };

  // Delete
  const deleteIssue = async () => {
    try {
      if (!id) {
        console.error("No ID provided");
        return;
      }
      const response = await axios.delete(`http://localhost:3000/issue/${id}`);
      console.log("Deleted Issue:", response.data);
    } catch (error) {
      console.error("Error deleting issue:", error.response || error.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="header">Issue Tracker</h1>
        <h2 className="header">By Nabneet Bhattacharjee</h2>
        <div className="form-container">
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="id">Issue ID:</label>
              <input
                id="id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter issue ID"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter issue title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter issue description"
              />
            </div>
          </div>
          <button className="btn" onClick={createIssue}>
            Create Issue
          </button>
          <button className="btn" onClick={readIssue}>
            Read Issue
          </button>
          <button className="btn" onClick={updateIssue}>
            Update Issue
          </button>
          <button className="btn" onClick={deleteIssue}>
            Delete Issue
          </button>
        </div>
        <pre className="response">{JSON.stringify(issue, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
