const tableBody =
    document.getElementById("exerciseTableBody");

const addExerciseBtn =
    document.getElementById("addExerciseBtn");

const exerciseName =
    document.getElementById("exerciseName");

const setsInput =
    document.getElementById("sets");

const repsInput =
    document.getElementById("reps");

const weightInput =
    document.getElementById("weight");

const notesInput = 
    document.getElementById("notes");

// prende id workout dall'url
const params =
    new URLSearchParams(window.location.search);

const workoutId =
    params.get("id");

// carica esercizi
async function loadExercises() {

    const response = await fetch(
        `/exercises/${workoutId}`
    );

    const exercises = await response.json();

    tableBody.innerHTML = "";

    exercises.forEach(exercise => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${exercise.exercise_name}</td>
            <td>${exercise.sets}</td>
            <td>${exercise.reps}</td>
            <td>${exercise.weight} kg</td>
            <td>${exercise.notes || "-"}</td>

            <td>

                <button onclick = "
                    editExercise(
                        ${exercise.id},
                        '${exercise.exercise_name}',
                        ${exercise.sets},
                        ${exercise.reps},
                        ${exercise.weight}
                    )
                ">
                    Modifica
                </button>

                <button onclick = "
                    deleteExercise(${exercise.id})
                ">
                    Elimina
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// aggiungi esercizio
addExerciseBtn.addEventListener("click", async () => {

    if( !exerciseName.value || !setsInput.value || !repsInput.value || !weightInput.value){

            alert("COMPILA TUTTI I CAMPI");

            return;

        }

        if (Number(setsInput.value) <= 0 || Number(repsInput.value) <= 0 || Number(weightInput.value) < 0){
            alert("INSERIRE VALORE CORRETTO");

            return;
        }

    const newExercise = {

        workout_id: workoutId,

        exercise_name: exerciseName.value,

        sets: setsInput.value,

        reps: repsInput.value,

        weight: weightInput.value

        notes: notesInput.value

    };

    await fetch("/exercises", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(newExercise)
    });

    exerciseName.value = "";
    setsInput.value = "";
    repsInput.value = "";
    weightInput.value = "";
    notesInput.value = "";

    loadExercises();
});

loadExercises();

// elimina esercizio
async function deleteExercise(id) {

    const confirmDelete = confirm(
        "Sei sicuro di voler eliminare questo esercizio?"
    );

    if (!confirmDelete) {

        return;
    }

    await fetch(`/exercises/${id}`, {

        method: "DELETE"
    });

    loadExercises();
}

// MODIFICA ESERCIZIO
async function editExercise(
    id,
    oldName,
    oldSets,
    oldReps,
    oldWeight
) {

    const newName =
        prompt("Nome esercizio:", oldName);

    const newSets =
        prompt("Serie:", oldSets);

    const newReps =
        prompt("Ripetizioni:", oldReps);

    const newWeight =
        prompt("Peso:", oldWeight);

    if (
        !newName ||
        !newSets ||
        !newReps ||
        !newWeight
    ) {

        return;
    }

    if(Number(newSets)<=0 || Number(newReps) <= 0 || Number(newWeight) < 0){
        alert("INSERISCI VALORI VALIDI!");

        return;
    }

    await fetch(`/exercises/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            exercise_name: newName,

            sets: newSets,

            reps: newReps,

            weight: newWeight
        })
    });

    loadExercises();
}

function goBack() {
    window.location.href = "/"; // homepage
}