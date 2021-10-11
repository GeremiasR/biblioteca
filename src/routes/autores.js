const express = require("express");
const router = express.Router();

//LISTADO
router.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("SELECT * FROM autor", (err, filas) => {
      if (err) res.json(err);
      res.render("autores", {
        data: filas,
      });
    });
  });
});

// ADD ACTION
router.post("/add", (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("INSERT INTO autor set ?", [data], (err, row) => {
      if (err) res.json(err);
      console.log(row);
      res.redirect("/autores");
    });
  });
});

// DELETE ACTION
router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("DELETE FROM autor WHERE idAutor = ?", [id], (err, row) => {
      if (err) res.json(err);
      console.log(row);
      res.redirect("/autores");
    });
  });
});

// EDIT
router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("SELECT * FROM autor WHERE idAutor = ?", [id], (err, row) => {
      if (err) res.json(err);
      console.log(row);
      res.render("autores_edit", { data: row[0] });
    });
  });
});

// EDIT ACTION
router.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query(
      "UPDATE autor set ? WHERE idAutor = ?",
      [data, id],
      (err, row) => {
        if (err) res.json(err);
        console.log(row);
        res.redirect("/autores");
      }
    );
  });
});

module.exports = router;
