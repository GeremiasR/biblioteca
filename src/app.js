const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");

const app = express();

// import routes
const categoriasRoutes = require("./routes/categoria");
const editorialesRoutes = require("./routes/editorial");
const isbnRoutes = require("./routes/isbn");
const autoresRoutes = require("./routes/autores");
const librosRoutes = require("./routes/libros");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "password",
      port: "3306",
      database: "mydb",
      multipleStatements: true,
    },
    "single"
  )
);
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/categorias", categoriasRoutes);
app.use("/editoriales", editorialesRoutes);
app.use("/isbn", isbnRoutes);
app.use("/autores", autoresRoutes);
app.use("/libros", librosRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  console.log("If server is dev, is on http://localhost:3000/");
});
