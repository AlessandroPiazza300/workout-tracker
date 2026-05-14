const modal =
    document.getElementById("exerciseModal");

const openModalBtn =
    document.getElementById("openModalBtn");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const addSelectedBtn =
    document.getElementById("addSelectedBtn");

const exerciseSelectionList =
    document.getElementById("exerciseSelectionList");

const comparisonTableBody =
    document.getElementById("comparisonTableBody");

let selectedExercises = [];

let comparisonChart;

// TORNA HOME
function goBack() {

    window.location.href = "/";
}

// APRI MODALE
openModalBtn.addEventListener("click", async () => {

    modal.classList.remove("hidden");

    const response =
        await fetch("/all-exercises");

    const exercises =
        await response.json();

    exerciseSelectionList.innerHTML = "";

    exercises.forEach(exercise => {

        const div =
            document.createElement("div");

        div.classList.add("exercise-option");

        div.innerHTML = `
            <strong>${exercise.exercise_name}</strong>
            <br>
            📅 ${new Date(exercise.date)
                .toLocaleDateString("it-IT")}
        `;

        div.addEventListener("click", () => {

            div.classList.toggle("selected");

            if (
                selectedExercises.includes(exercise)
            ) {

                selectedExercises =
                    selectedExercises.filter(
                        e => e.id !== exercise.id
                    );

            } else {

                selectedExercises.push(exercise);
            }

            addSelectedBtn.disabled =
                selectedExercises.length === 0;
        });

        exerciseSelectionList.appendChild(div);
    });
});

// CHIUDI
closeModalBtn.addEventListener("click", () => {

    modal.classList.add("hidden");

    selectedExercises = [];

    addSelectedBtn.disabled = true;
});

// AGGIUNGI
addSelectedBtn.addEventListener("click", () => {

    comparisonTableBody.innerHTML = "";

    const labels = [];

    const weights = [];

    selectedExercises.forEach((exercise, index) => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${exercise.exercise_name}</td>
            <td>
                ${new Date(exercise.date)
                    .toLocaleDateString("it-IT")}
            </td>
            <td>${exercise.weight} kg</td>

            <td>
                    <button onclick="
                        removeFromComparison(${exercise.id})
                    ">
                        Elimina
                    </button>
            </td>
        `;

        comparisonTableBody.appendChild(row);

        labels.push(index + 1);

        weights.push(exercise.weight);
    });

    createChart(labels, weights);

    modal.classList.add("hidden");
});

function removeFromComparison(id) {

    selectedExercises =
        selectedExercises.filter(
            exercise => exercise.id !== id
        );

    comparisonTableBody.innerHTML = "";

    const labels = [];

    const weights = [];

    selectedExercises.forEach((exercise, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>${exercise.exercise_name}</td>

            <td>
                ${new Date(exercise.date)
                    .toLocaleDateString("it-IT")}
            </td>

            <td>${exercise.weight} kg</td>

            <td>
                <button onclick="
                    removeFromComparison(${exercise.id})
                ">
                    Elimina
                </button>
            </td>
        `;

        comparisonTableBody.appendChild(row);

        labels.push(index + 1);

        weights.push(exercise.weight);
    });

    createChart(labels, weights);
}

// GRAFICO
function createChart(labels, weights) {

    if (comparisonChart) {

        comparisonChart.destroy();
    }

    const ctx =
        document.getElementById("comparisonChart");

    comparisonChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [{

                label: "Peso esercizio",

                data: weights,

                tension: 0.3
            }]
        },

        options: {

            responsive: true
        }
    });
}