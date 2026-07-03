const tableBody =
    document.getElementById("cardioTableBody");

const addCardioBtn =
    document.getElementById("addCardioBtn");

const cardioName =
    document.getElementById("exerciseName");

const minutesInput =
    document.getElementById("minutes");

const speedInput = 
    document.getElementById("speed");

const resistanceInput =
    document.getElementById("resistance");

const notesInput =
    document.getElementById("notes");

let cardioExercises = [];

const metValues = {

    "Camminata lenta": 2.8,
    "Camminata normale": 3.9,
    "Camminata veloce": 5.0,

    "Bicicletta lenta": 4.2,
    "Bicicletta normale": 6.0,
    "Bicicletta veloce": 8.5,

    "Mountain bike": 11.0,

    "Corsa lenta": 7.0,
    "Corsa normale": 9.0,
    "Corsa veloce": 12.0,

    "Scale": 8.8,

    "Nuoto": 7.5,
    "Acquagym": 4.5,

    "Salto con la corda": 11.5,

    "Calcio": 8.5,
    "Tennis": 7.0,
    "Basket": 7.5,
    "Pallavolo": 4.5,

    "Pattinaggio": 7.0,

    "Zumba": 7.5,
    "Danza": 6.0

};

// TORNA ALLA HOME
function goBack() {

    window.location.href = "/";
}

async function loadcardio() {

    try {

        const response = await fetch("/cardio");


        if(!response.ok){

            throw new Error("Errore caricamento cardio");

        }


        cardioExercises = await response.json();


        renderTable();


    } catch(error){

        console.error(error);

    }
}

// CALCOLO CALORIE CON FORMULA MET
function calculateCalories(
    exercise,
    minutes,
    weight
) {

    let met = metValues[exercise];

    if (!met){

        met = 5;
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
            <td>${exercise.exercise_name}</td>

            <td>${exercise.minutes}</td>

            <td>${exercise.speed || "-"}</td>

            <td>${exercise.resistance || "-"}</td>

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
addCardioBtn.addEventListener("click", async() => {

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

        exercise_name: cardioName.value,

        minutes:Number(minutesInput.value),

        speed: speedInput.value,

        resistance: resistanceInput.value,

        calories: calories,

        notes: notesInput.value

    };

    const response = await fetch("/cardio", {
        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(cardioExercise)
    });
    const data = await  response.json();
    console.log(data);
    
    if (!response.ok){
        alert("errore nel salvataggio del cardio");
        return;
    }

    loadcardio();

    cardioName.value = "";
    minutesInput.value = "";
    speedInput.value = "";
    resistanceInput.value = "";
    notesInput.value = "";
});

// ELIMINA
async function deleteCardio(id) {
    
    const confirmDelete = confirm("SEI SICURO DI VOLER ELIMINARE?");

    if(!confirmDelete){
        return;
    }

    await fetch(`/cardio/${id}`,{

        method:"DELETE"
    });

    loadcardio();
}

// MODIFICA
async function editCardio(id) {

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
            exercise.exercise_name
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

    exercise.exercise_name =
        newName;

    exercise.minutes =
        Number(newMinutes);

    exercise.resistance =
        newResistance;

    exercise.notes =
        newNotes;

    await fetch(`/cardio/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            exercise_name:newName,
            minutes:newMinutes,
            resistance:newResistance,
            calories:exercise.calories,
            notes:newNotes
        })
    });

    loadcardio();
}

function updateFields(){
    const activity = cardioName.value;

    if (activity ==="Tapis roulant") {

        speedInput.disabled = false;
        resistanceInput.disabled = false;

        speedInput.placeholder = "Velocità(km/h)";
        resistanceInput.placeholder = "Inclinazione/Resistenza";
    
    } else if(activity === "Cyclette"){

        speedInput.disabled = true;
        resistanceInput.disabled = false;

        speedInput.value = "";

        speedInput.placeholder = "Non necessario";
        resistanceInput.placeholder = "Resistenza";
    }
    
    else{
        speedInput.disabled = true;
        resistanceInput.disabled = true;

        speedInput.value = "";
        resistanceInput.value = "";

        speedInput.placeholder = "Non necessario";
        resistanceInput.placeholder = "Non necessario";
    }

}

// questo fa si che ogni volta che cambi esercizio la pagina aggiorna automaticamente i campi
cardioName.addEventListener(
    "change",
    updateFields
);

window.onload= ()=> {
    loadcardio();
    updateFields(); //appena apro la pagina i campi saranno gia nello stato corretto
};