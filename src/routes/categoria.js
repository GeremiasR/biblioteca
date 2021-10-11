const express = require("express");
const router = express.Router();

//LISTADO
router.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("SELECT * FROM categoria", (err, filas) => {
      if (err) res.json(err);
      res.render("categorias", {
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
    conn.query("INSERT INTO categoria set ?", [data], (err, row) => {
      if (err) res.json(err);
      console.log(row);
      res.redirect("/categorias");
    });
  });
});

// DELETE ACTION
router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query(
      "DELETE FROM categoria WHERE idCategoria = ?",
      [id],
      (err, row) => {
        if (err) res.json(err);
        console.log(row);
        res.redirect("/categorias");
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
      "SELECT * FROM categoria WHERE idCategoria = ?",
      [id],
      (err, row) => {
        if (err) res.json(err);
        console.log(row);
        res.render("categorias_edit", { data: row[0] });
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
      "UPDATE categoria set ? WHERE idCategoria = ?",
      [data, id],
      (err, row) => {
        if (err) res.json(err);
        console.log(row);
        res.redirect("/categorias");
      }
    );
  });
});

module.exports = router;
