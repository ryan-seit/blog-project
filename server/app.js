const express = require("express");
const routes = require("./routes/");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cloudinary = require("cloudinary");

const app = express();
const router = express.Router();
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium";

// configure cloudinary
cloudinary.config({
	cloud_name: "chidumennamdi",
	api_key: "",
	api_secret: "",
});

// connect to MongoDB datastore
try {
	mongoose.connect(url, {
		// useMongoClient: true
	});
} catch (error) {}

let port = 5000 || process.env.port;

// set up routes {API Endpoints}
routes(router);

// set up middlewares
app.use(cors()); // prevent cross-origin request errors
app.use(bodyParser.json()); // parse formdata in POST requests into req.body object
app.use(helmet()); // prevent API attacks

app.use("/api", router);

// start server
app.listen(port, () => {
	console.log(`Server started at port: ${port}`);
});
