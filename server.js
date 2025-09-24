// Not used in GitHub Pages (only if deploying on Node.js server)
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("."));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
