const workoutList = document.getElementById("workoutList");

const addWorkoutBtn = document.getElementById("addWorkoutBtn");

const nameInput = document.getElementById("name");

const dateInput = document.getElementById("date");

const durationInput = document.getElementById("duration");

const searchInput = document.getElementById("searchInput");
const dateFilter = document.getElementById("dateFilter");
const clearSearchBtn = document.getElementById("clearSearchBtn");

const totalWorkouts = document.getElementById("totalWorkouts");
const totalMinute = document.getElementById("totalMinutes");
const averageDuration = document.getElementById("averageDuration");

const badgeContainer = document.getElementById("badgeContainer");

let workoutChart; // con let il grafico viene creato distrutto e ricreato ogni volta che deve essere aggiornato

// filtra i workout in base al nome cercato e alla data selezionata dall'utente
function applyFilters(workouts) {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedDate =
        dateFilter.value;

    return workouts.filter(workout => {

        const matchName = // controlla se il nome del workout contiene il testo cercato
            workout.name
                .toLowerCase()
                .includes(searchValue);

        const matchDate =
            !selectedDate ||
            workout.date.slice(0, 10) === selectedDate;

        return matchName && matchDate;
    });
}

// Carica tutti i workout dal database, aggiorna statistiche, grafico e lista HTML
async function loadWorkouts() {

    try {

        // richiesta GET al server tramite FETCH API
        const response = await fetch("/workouts");

        if (!response.ok) {

            throw new Error("Errore server");
        }

        const allWorkouts = await response.json();

        const workouts = applyFilters(allWorkouts);

        workoutList.innerHTML = "";

        // parte che mi aiuta a calcolare le statistiche
        const total = workouts.length;

        let minutes = 0;

        workouts.forEach(workout => {
            
            minutes += Number(workout.duration); // somma le durate di tutti i workouts
        });

        const average =  // calcolo media 
            total > 0
            ? Math.round(minutes/total)
            : 0;

        // aggiornamento dashboard

        totalWorkouts.textContent = total; // aggiornamento HTML automatico

        totalMinute.textContent = minutes;

        averageDuration.textContent = average;

        badgeContainer.innerHTML = "";

        if (total >= 5) {

            badgeContainer.innerHTML += `
                <div class="stat-card">
                    🥉 5 Workout completati
                </div>
            `;
        }

       if (total >= 10) {

            badgeContainer.innerHTML += `
                <div class="stat-card">
                    🥈 10 Workout completati
                </div>
            `;
        }

        if (total >= 20) {

            badgeContainer.innerHTML += `
                <div class="stat-card">
                    🥇 20 Workout completati
                </div>
            `;
        }

        // GRAFICO

        const labels = [];

        const durations = [];

        workouts.forEach(workout => {

            const uniqueLabel = `${workout.name} (${new Date(workout.date).toLocaleDateString("it-IT")})`;

            labels.push(uniqueLabel);

            durations.push(workout.duration);
        });

        // distruggi vecchio grafico nessun problema di duplicazione 
        if (workoutChart) {

            workoutChart.destroy();
        }

        const ctx =
            document.getElementById("workoutChart");

        workoutChart = new Chart(ctx, {

            type: "bar",

            data: {

                labels: labels,

                datasets: [{

                    label: "Durata Workout",

                    data: durations,

                    borderWidth: 1
                }]
            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        labels: {
                            color: "white"
                        }
                    }
                },

                scales: {

                    x: {

                        ticks: {
                            color: "white"
                        }
                    },

                    y: {

                        beginAtZero: true,

                        ticks: {
                            color: "white"
                        }
                    }
                }
            }
        });


        workouts.forEach(workout => {

            const workoutCard = document.createElement("div");

            workoutCard.classList.add("workout-card");

            const formattedDate = new Date(workout.date)
                .toLocaleDateString("it-IT");

            workoutCard.innerHTML = `
                <h3 onclick = "openWorkout(${workout.id})">
                    ${workout.name}
                </h3>

                <p>📅 ${formattedDate}</p>

                <p>⏱ ${workout.duration} minuti</p>

                <button onclick="editWorkout(
                    ${workout.id},
                    '${workout.name.replace(/'/g, "\\'")}',
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

searchInput.addEventListener("input", () => {

    loadWorkouts();
});

dateFilter.addEventListener(
    "change",
    loadWorkouts
);

clearSearchBtn.addEventListener("click", () => { // svuota ricerca, filtro data e ricarica tutti i workout

    searchInput.value = "";
    dateFilter.value = "";

    loadWorkouts();
});

// AGGIUNGI WORKOUT al nuovo database
addWorkoutBtn.addEventListener("click", async () => {

    if (!nameInput.value.trim() || !dateInput.value.trim () || !durationInput.value.trim()){
        alert("COMPILA TUTTI I CAMPI!");

        return;
    }

    if(Number(durationInput.value) <=0){

        alert("LA DURATA DEVE ESSERE POSITIVA!");

        return;
    }

    const newWorkout = {

        name: nameInput.value,

        date: dateInput.value,

        duration: durationInput.value
    };

    try {

        // richiesta POST per salvare il workout nel database
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

    const confirmDelete = confirm("SEI SICURO DI VOLER ELIMINARE?");

    if(!confirmDelete){
        return;
    }

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

// MODIFICA WORKOUT esistente tramite richiesta PUT
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

        duration: Number(newDuration)
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

// reindirizza alla pagina dettaglio del workout
function openWorkout(id){
    window.location.href = // cambia pagina
        `workout.html?id=${id}`;
}

function openComparisonPage(){

    window.location.href = "comparison.html";
}

function openCardioPage(){
    
    window.location.href = "cardio.html";
}