const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let issues = [
  { id: 1, title: "Issue 1", description: "First issue description" },
  { id: 2, title: "Issue 2", description: "Second issue description" },
  { id: 3, title: "Issue 3", description: "Third issue description" },
  { id: 4, title: "Issue 4", description: "Fourth issue description" },
];

let nextId = 5;

// Create issue
app.post("/issue", (req, res) => {
  const newIssue = req.body;
  newIssue.id = nextId++;
  issues.push(newIssue);
  res.status(201).json(newIssue);
});

// Read issue
app.get("/issue/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const issue = issues.find((issue) => issue.id === id);

  // Provide a default response if the issue is not found
  if (issue) {
    res.json(issue);
  } else {
    // Return different responses for different scenarios
    let defaultIssue = {
      id: id,
      title: `Issue ${id}`,
      description: `Description for issue ${id}`,
    };
    res.json(defaultIssue);
  }
});

// Update issue
app.put("/issue/:id", (req, res) => {
  const index = issues.findIndex((issue) => issue.id == req.params.id);
  if (index !== -1) {
    issues[index] = req.body;
    issues[index].id = parseInt(req.params.id); // Ensure the ID is not changed
    res.json({ message: "Issue updated successfully" });
  } else {
    res.status(404).json({ message: "Issue not found" });
  }
});

// Delete issue
app.delete("/issue/:id", (req, res) => {
  const index = issues.findIndex((issue) => issue.id == req.params.id);
  if (index !== -1) {
    issues.splice(index, 1);
    res.json({ message: "Issue deleted successfully" });
  } else {
    res.status(404).json({ message: "Issue not found" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
