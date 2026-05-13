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
        `;

        tableBody.appendChild(row);
    });
}

// aggiungi esercizio
addExerciseBtn.addEventListener("click", async () => {

    const newExercise = {

        workout_id: workoutId,

        exercise_name: exerciseName.value,

        sets: setsInput.value,

        reps: repsInput.value,

        weight: weightInput.value
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

    loadExercises();
});

loadExercises();

function goBack() {
    window.location.href = "/"; // homepage
}