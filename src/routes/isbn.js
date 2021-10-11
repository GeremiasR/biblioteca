const express = require("express");
const router = express.Router();

//LISTADO
router.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("SELECT * FROM isbn", (err, filas) => {
      if (err) res.json(err);
      res.render("isbn", {
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
    conn.query("INSERT INTO isbn set ?", [data], (err, row) => {
      if (err) res.json(err);
      console.log(row);
      res.redirect("/isbn");
    });
  });
});

// DELETE ACTION
router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("DELETE FROM isbn WHERE idISBN = ?", [id], (err, row) => {
      if (err) res.json(err);
      console.log(row);
      res.redirect("/isbn");
    });
  });
});

// EDIT
router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("SELECT * FROM isbn WHERE idISBN = ?", [id], (err, row) => {
      if (err) res.json(err);
      console.log(row);
      res.render("isbn_edit", { data: row[0] });
    });
  });
});

// EDIT ACTION
router.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("UPDATE isbn set ? WHERE idISBN = ?", [data, id], (err, row) => {
      if (err) res.json(err);
      console.log(row);
      res.redirect("/isbn");
    });
  });
});

module.exports = router;
