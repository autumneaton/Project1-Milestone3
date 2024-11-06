let express = require("express");
let app = new express();
// set up database connection
const knex = require("knex")({
client: "mysql",
connection: {
host: "",
user: "admin",
password: "password",
database: "dinosaurs",
port: 3306
},
});

// Set EJS as the templating engine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    knex.select().from("dinosaur")
    .then((result) => {
    console.log(result);
    //Render the index.ejs template and pass the result
    res.render("index", {dinosaurs: result});
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error fetching data");
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
app.use('/views', express.static('views'));
