const express = require("express");
const cors = require("cors");
const routes = require("./app/routes");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use("/", routes);

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);
