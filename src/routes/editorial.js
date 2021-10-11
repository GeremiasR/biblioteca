const express = require("express");
const router = express.Router();

//LISTADO
router.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("SELECT * FROM editorial", (err, filas) => {
      if (err) res.json(err);
      res.render("editoriales", {
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
    conn.query("INSERT INTO editorial set ?", [data], (err, row) => {
      if (err) res.json(err);
      console.log(row);
      res.redirect("/editoriales");
    });
  });
});

// DELETE ACTION
router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query(
      "DELETE FROM editorial WHERE idEditorial = ?",
      [id],
      (err, row) => {
        if (err) res.json(err);
        console.log(row);
        res.redirect("/editoriales");
      }
    );
  });
});

// EDIT
router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query(
      "SELECT * FROM editorial WHERE idEditorial = ?",
      [id],
      (err, row) => {
        if (err) res.json(err);
        console.log(row);
        res.render("editoriales_edit", { data: row[0] });
      }
    );
  });
});

// EDIT ACTION
router.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query(
      "UPDATE editorial set ? WHERE idEditorial = ?",
      [data, id],
      (err, row) => {
        if (err) res.json(err);
        console.log(row);
        res.redirect("/editoriales");
      }
    );
  });
});

module.exports = router;
