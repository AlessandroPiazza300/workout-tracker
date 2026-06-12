const tableBody =
    document.getElementById("cardioTableBody");

const addCardioBtn =
    document.getElementById("addCardioBtn");

const cardioName =
    document.getElementById("cardioName");

const minutesInput =
    document.getElementById("minutes");

const resistanceInput =
    document.getElementById("resistance");

const notesInput =
    document.getElementById("notes");

let cardioExercises = [];

// TORNA ALLA HOME
function goBack() {

    window.location.href = "/";
}

// CALCOLO CALORIE CON FORMULA MET
function calculateCalories(
    exercise,
    minutes,
    weight
) {

    let met = 5;

    switch (exercise.toLowerCase()) {

        case "camminata":
            met = 3.8;
            break;

        case "corsa":
            met = 8;
            break;

        case "bicicletta":
            met = 7.5;
            break;

        case "cyclette":
            met = 7;
            break;

        case "salto con la corda":
            met = 12;
            break;

        case "ellittica":
            met = 5;
            break;

        case "vogatore":
            met = 7;
            break;

        case "stepper":
            met = 8.5;
            break;

        case "tapis roulant":
            met = 6;
            break;

        default:
            met = 5;
            break;
    }

    const calories =
        met *
        weight *
        (minutes / 60);

    return Math.round(calories);
}

// CARICAMENTO TABELLA
function renderTable() {

    tableBody.innerHTML = "";

    cardioExercises.forEach(exercise => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${exercise.name}</td>

            <td>${exercise.minutes}</td>

            <td>${exercise.resistance}</td>

            <td>${exercise.calories}</td>

            <td>${exercise.notes || "-"}</td>

            <td>

                <button onclick="
                    editCardio(${exercise.id})
                ">
                    Modifica
                </button>

                <button onclick="
                    deleteCardio(${exercise.id})
                ">
                    Elimina
                </button>

            </td>
        `;

        tableBody.appendChild(row);
    });
}

// AGGIUNTA ATTIVITÀ CARDIO
addCardioBtn.addEventListener("click", () => {

    if (
        !cardioName.value.trim() ||
        !minutesInput.value.trim()
    ) {

        alert("COMPILA TUTTI I CAMPI!");

        return;
    }

    if (
        Number(minutesInput.value) <= 0
    ) {

        alert("I MINUTI DEVONO ESSERE POSITIVI!");

        return;
    }

    const weight = prompt(
        "Inserisci il tuo peso corporeo (kg)"
    );

    if (
        !weight ||
        Number(weight) <= 0
    ) {

        alert("PESO NON VALIDO!");

        return;
    }

    const calories =
        calculateCalories(
            cardioName.value,
            Number(minutesInput.value),
            Number(weight)
        );

    const cardioExercise = {

        id: Date.now(),

        name: cardioName.value,

        minutes:
            Number(minutesInput.value),

        resistance:
            resistanceInput.value,

        notes:
            notesInput.value,

        calories:
            calories
    };

    cardioExercises.push(
        cardioExercise
    );

    renderTable();

    cardioName.value = "";
    minutesInput.value = "";
    resistanceInput.value = "";
    notesInput.value = "";
});

// ELIMINA
function deleteCardio(id) {

    const confirmDelete = confirm(
        "Sei sicuro di voler eliminare questa attività?"
    );

    if (!confirmDelete) {

        return;
    }

    cardioExercises =
        cardioExercises.filter(
            exercise =>
                exercise.id !== id
        );

    renderTable();
}

// MODIFICA
function editCardio(id) {

    const exercise =
        cardioExercises.find(
            e => e.id === id
        );

    if (!exercise) {

        return;
    }

    const newName =
        prompt(
            "Nome esercizio:",
            exercise.name
        );

    const newMinutes =
        prompt(
            "Minuti:",
            exercise.minutes
        );

    const newResistance =
        prompt(
            "Inclinazione/Resistenza:",
            exercise.resistance
        );

    const newNotes =
        prompt(
            "Note:",
            exercise.notes
        );

    if (
        !newName ||
        !newMinutes
    ) {

        return;
    }

    if (
        Number(newMinutes) <= 0
    ) {

        alert("INSERISCI VALORI VALIDI!");

        return;
    }

    exercise.name =
        newName;

    exercise.minutes =
        Number(newMinutes);

    exercise.resistance =
        newResistance;

    exercise.notes =
        newNotes;

    renderTable();
}