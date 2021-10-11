const express = require("express");
const router = express.Router();

//LISTADO
router.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("SELECT * FROM tiempoestadia", (err, filas) => {
      if (err) res.json(err);
      res.render("tiempo", {
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
    conn.query("INSERT INTO tiempoestadia set ?", [data], (err, row) => {
      if (err) res.json(err);
      console.log(row);
      res.redirect("/tiempoEstadia");
    });
  });
});

// DELETE ACTION
router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query(
      "DELETE FROM tiempoestadia WHERE idTiempoEstadia = ?",
      [id],
      (err, row) => {
        if (err) res.json(err);
        console.log(row);
        res.redirect("/tiempoEstadia");
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
      "SELECT * FROM tiempoestadia WHERE idTiempoEstadia = ?",
      [id],
      (err, row) => {
        if (err) res.json(err);
        console.log(row);
        res.render("tiempo_edit", { data: row[0] });
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
      "UPDATE tiempoestadia set ? WHERE idTiempoEstadia = ?",
      [data, id],
      (err, row) => {
        if (err) res.json(err);
        console.log(row);
        res.redirect("/tiempoEstadia");
      }
    );
  });
});

module.exports = router;
