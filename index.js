const express = require("express");
const cors = require("cors");
const path = require("path");
const port = 8080;
const app = express();
const Datastore = require("nedb");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));
app.use(express.json({ limit: "10mb" }));

const database = new Datastore("public/database.db");
database.loadDatabase();

app.get("/", function(req, res) {
	const filePath = path.join(__dirname, "public/index.1.html");

	res.sendFile(filePath, function(err) {
		if (err) {
			console.error(err);
			res.status(500).send(err);
		}
	});
});

app.post("/add", (req, res) => {
	let data = req.body;

	let { name, datum, gewicht, umfang } = req.body;
	name === "Dani"
		? database.update(
				{ id: 2 },
				{ $push: { datum: datum, gewicht: gewicht, umfang: umfang } },
				{},
				function() {}
		  )
		: database.update(
				{ id: 1 },
				{ $push: { datum: datum, gewicht: gewicht, umfang: umfang } },
				{},
				function() {}
		  );

	// database.insert(data, (err, newDoc) => {

	// 	console.log(newDoc);
	// });
	res.json({ status: "success", data: data });
});

app.get("/api", (req, res) => {
	database.find({}, (err, data) => {
		if (err) {
			res.end();
			return;
		}
		res.json(data);
	});
});

app.listen(port, () => {
	console.log("Weightless runs on Port " + port);
});
