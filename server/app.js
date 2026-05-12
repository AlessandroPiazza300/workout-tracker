const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(
    path.join(__dirname,"../client") // dice a express usa la cartella client come frontend
));

// test server
app.get("/", (req, res) => {
    res.send("Workout Tracker API attiva 🚀");
});

// crea tabella all’avvio
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS workouts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            date TEXT,
            duration INTEGER
        )
    `);
// nuova tabella per esercizi all'interno del workout
    db.run(`
    
        CREATE TABLE IF NOT EXISTS. exercises(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            
            workout_id INTEGER,

            exercise_name TEXT,

            sets INTEGER,

            reps INTEGER,

            weight INTEGER,

            FOREIGN KEY(workout_id)
            REFERENCES workouts(id)
        )
    `);
});

app.get("/workouts", (req, res) => {

    const query = "SELECT * FROM workouts";

    db.all(query, [], (err,rows) => {

        if(err){
            console.error(err.message);

            return res.status(500).json({
                error: "errore lettura workout"
            });
        }
        res.json(rows);
    });
});

// POST nuovo workout
app.post("/workouts", (req, res) => {

    const { name, date, duration } = req.body;

    // controllo campi
    if (!name || !date || !duration) {

        return res.status(400).json({
            error: "Tutti i campi sono obbligatori"
        });
    }

    const query = `
        INSERT INTO workouts (name, date, duration)
        VALUES (?, ?, ?)
    `;

    db.run(query, [name, date, duration], function (err) {

        if (err) {
            console.error(err.message);

            return res.status(500).json({
                error: "Errore inserimento workout"
            });
        }

        res.status(201).json({
            message: "Workout creato con successo ✅",
            workoutId: this.lastID
        });
    });
});

// DELETE workout
app.delete("/workouts/:id", (req, res) => {

    const id = req.params.id;

    const query = `
        DELETE FROM workouts
        WHERE id = ?
    `;

    db.run(query, [id], function (err) {

        if (err) {
            console.error(err.message);

            return res.status(500).json({
                error: "Errore eliminazione workout"
            });
        }

        // nessun workout trovato
        if (this.changes === 0) {

            return res.status(404).json({
                error: "Workout non trovato"
            });
        }

        res.json({
            message: "Workout eliminato con successo ✅"
        });
    });
});

// UPDATE workout
app.put("/workouts/:id", (req, res) => {

    const id = req.params.id;

    const { name, date, duration } = req.body;

    // controllo campi
    if (!name || !date || !duration) {

        return res.status(400).json({
            error: "Tutti i campi sono obbligatori"
        });
    }

    const query = `
        UPDATE workouts
        SET name = ?, date = ?, duration = ?
        WHERE id = ?
    `;

    db.run(query, [name, date, duration, id], function (err) {

        if (err) {
            console.error(err.message);

            return res.status(500).json({
                error: "Errore aggiornamento workout"
            });
        }

        // workout non trovato
        if (this.changes === 0) {

            return res.status(404).json({
                error: "Workout non trovato"
            });
        }

        res.json({
            message: "Workout aggiornato con successo ✅"
        });
    });
});

app.listen(3000, () => {
    console.log("Server avviato su http://localhost:3000");
});