const workoutList = document.getElementById("workoutList");

const addWorkoutBtn = document.getElementById("addWorkoutBtn");

const nameInput = document.getElementById("name");

const dateInput = document.getElementById("date");

const durationInput = document.getElementById("duration");

const searchInput = document.getElementById("searchInput");
const dateFilter = document.getElementById("dateFilter");


// CARICA WORKOUT
async function loadWorkouts() {

    try {

        const response = await fetch("/workouts");

        const workouts = await response.json();

        workoutList.innerHTML = "";

        workouts.forEach(workout => {

            const searchValue = 
                searchInput.value.toLowerCase();

            const selectdDate = 
                dateFilter.value;

            // filtro ricerca
            if (
                !workout.name
                .toLowerCase()
                .includes(searchValue)
            ) {
                return;
            }

            // filtro data
            if (
                selectedDate &&
                 workout.date !== selectedDate
            ) {
                return;
            }

            const workoutCard = document.createElement("div");

            workoutCard.classList.add("workout-card");

            const formattedDate = new Date(workout.date)
                .toLocaleDateString("it-IT");

            workoutCard.innerHTML = `
                <h3>${workout.name}</h3>

                <p>📅 ${formattedDate}</p>

                <p>⏱ ${workout.duration} minuti</p>

                <button onclick="editWorkout(
                    ${workout.id},
                    '${workout.name}',
                    '${workout.date}',
                    ${workout.duration}
                )">
                    Modifica
                </button>

                <button onclick="deleteWorkout(${workout.id})">
                    Elimina
                </button>
            `;

            workoutList.appendChild(workoutCard);
        });

    } catch (error) {

        console.error("Errore caricamento workout:", error);
    }
}

searchInput.addEventListener(
    "input",
    loadWorkouts
);

dateFilter.addEventListener(
    "change",
    loadWorkouts
);


// AGGIUNGI WORKOUT
addWorkoutBtn.addEventListener("click", async () => {

    const newWorkout = {

        name: nameInput.value,

        date: dateInput.value,

        duration: durationInput.value
    };

    try {

        const response = await fetch("/workouts", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newWorkout)
        });

        const data = await response.json();

        console.log(data);

        // reset campi
        nameInput.value = "";

        dateInput.value = "";

        durationInput.value = "";

        // ricarica lista
        loadWorkouts();

    } catch (error) {

        console.error("Errore inserimento workout:", error);
    }
});


// carica workout all'avvio
loadWorkouts();

// ELIMINA WORKOUT
async function deleteWorkout(id) {

    try {

        const response = await fetch(`/workouts/${id}`, {

            method: "DELETE"
        });

        const data = await response.json();

        console.log(data);

        // ricarica lista
        loadWorkouts();

    } catch (error) {

        console.error("Errore eliminazione:", error);
    }
}

// MODIFICA WORKOUT
async function editWorkout(id, oldName, oldDate, oldDuration) {

    const newName = prompt("Nuovo nome workout:", oldName);

    const newDate = prompt("Nuova data:", oldDate);

    const newDuration = prompt(
        "Nuova durata:",
        oldDuration
    );

    // se utente annulla
    if (!newName || !newDate || !newDuration) {
        return;
    }

    const updatedWorkout = {

        name: newName,

        date: newDate,

        duration: newDuration
    };

    try {

        const response = await fetch(`/workouts/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(updatedWorkout)
        });

        const data = await response.json();

        console.log(data);

        loadWorkouts();

    } catch (error) {

        console.error("Errore modifica:", error);
    }
}
