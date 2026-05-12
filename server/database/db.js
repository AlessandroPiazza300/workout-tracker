const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// crea il file database fisico
const db = new sqlite3.Database(
    path.join(__dirname, "workout.db"),
    (err) => {
        if (err) {
            console.error("Errore connessione DB:", err.message);
        } else {
            console.log("Database connesso correttamente ✅");
        }
    }
);

module.exports = db;