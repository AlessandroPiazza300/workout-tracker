const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const path = require("path");


const app = express();

db.run("PRAGMA foreign_keys = ON"); // server pre la funzione on delete cascade

app.use(cors());
app.use(express.json());

app.use(express.static(
    path.join(__dirname,"../client") // dice a express usa la cartella client come frontend
));

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
    
        CREATE TABLE IF NOT EXISTS exercises(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            
            workout_id INTEGER,

            exercise_name TEXT,

            sets INTEGER,

            reps INTEGER,

            weight REAL,

            notes TEXT,

            FOREIGN KEY(workout_id)
            REFERENCES workouts(id)
            ON DELETE CASCADE
        )
    `);
});

app.get("/workouts", (req, res) => {

    const query = "SELECT * FROM workouts ORDER BY date DESC";

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

// GET esercizi di un workout
app.get("/exercises/:workoutId", (req, res) => {

    const query = `
        SELECT * FROM exercises
        WHERE workout_id = ?
        ORDER BY id DESC
    `;

    db.all(query, [req.params.workoutId], (err, rows) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);
    });
});

// POST nuovo esercizio
app.post("/exercises", (req, res) => {

    const {
        workout_id,
        exercise_name,
        sets,
        reps,
        weight,
        notes
    } = req.body;

    const query = `
        INSERT INTO exercises (
            workout_id,
            exercise_name,
            sets,
            reps,
            weight,
            notes
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    if (!workout_id || !exercise_name || !sets || !reps){
        return res.status(400).json({
            error: "CAMPI MANCANTI"
        });
    }

    if ( isNaN(Number(sets)) ||isNaN(Number(reps)) ||isNaN(Number(weight)) || Number(sets) <= 0 || Number(reps) <= 0 || Number(weight) < 0) {
        return res.status(400).json({
            error: "VALORI NON VALIDI"
        });
    }

    db.run(
        query,
        [
            workout_id,
            exercise_name,
            sets,
            reps,
            weight,
            notes
        ],
        function(err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Esercizio aggiunto"
            });
        }
    );
});

// UPDATE esercizio
app.put("/exercises/:id", (req, res) => {

    const {
        exercise_name,
        sets,
        reps,
        weight,
        notes
    } = req.body;

    const query = `
        UPDATE exercises
        SET
            exercise_name = ?,
            sets = ?,
            reps = ?,
            weight = ?,
            notes = ?
        WHERE id = ?
    `;

    db.run(
        query,
        [
            exercise_name,
            sets,
            reps,
            weight,
            notes,
            req.params.id
        ],
        function(err) {

            if (err) {

                return res.status(500).json(err);
            }

            res.json({
                message: "Esercizio aggiornato"
            });
        }
    );
});

// DELETE esercizio
app.delete("/exercises/:id", (req, res) => {

    const query = `
        DELETE FROM exercises
        WHERE id = ?
    `;

    db.run(query, [req.params.id], function(err) {

        if (err) {

            return res.status(500).json(err);
        }

        res.json({
            message: "Esercizio eliminato"
        });
    });
});

app.get("/all-exercises", (req, res) => {

    const query = `

        SELECT
            exercises.id,
            exercises.exercise_name,
            exercises.weight,
            exercises.sets,
            exercises.reps,
            workouts.date

        FROM exercises

        JOIN workouts
        ON exercises.workout_id = workouts.id
    `;

    db.all(query, [], (err, rows) => {

        if (err) {

            return res.status(500).json(err);
        }

        res.json(rows);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server avviato sulla porta ${PORT}`);
});
