const express = require("express");
const router = express.Router();

//LISTADO
router.get("/", async (req, res) => {
  req.getConnection(async (err, conn) => {
    if (err) res.json(err);
    conn.query(
      `SELECT * from libros; 
      SELECT * from autor; 
      SELECT * from editorial; 
      SELECT * from categoria; 
      SELECT * from isbn;`,

      function (err, results) {
        if (err) throw err;
        res.render("libros", {
          data: results[0],
          autores: results[1],
          editoriales: results[2],
          categorias: results[3],
          isbn: results[4],
        });
      }
    );
  });
});

// ADD ACTION
router.post("/add", (req, res) => {
  const data = req.body;
  console.log("asd", data);
  req.getConnection((err, conn) => {
    if (err) res.json(err);
    conn.query("INSERT INTO libros set ?", [data], (err, row) => {
      if (err) res.json(err);
      console.log(row);
      res.redirect("/libros");
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
