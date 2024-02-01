const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  const msg = "Welcome to text analyzer apllication";
  res.json({ msg });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
