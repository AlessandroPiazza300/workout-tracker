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

    let met;

    // 1. TAPIS ROULANT
    if (exercise === "Tapis roulant") {

        const speed = Number(speedInput.value);
        const incline = Number(resistanceInput.value);

        const roundedSpeed = Math.round(speed);

        let roundedIncline = Math.round(incline / 3) * 3;

        if (roundedIncline < 0) roundedIncline = 0;
        if (roundedIncline > 15) roundedIncline = 15;

        const metTable = {
            4:  [3.0, 3.8, 4.8, 6.0, 7.2, 8.5],
            5:  [3.8, 4.8, 5.8, 7.0, 8.3, 9.8],
            6:  [4.8, 6.0, 7.2, 8.5, 10.0, 11.5],
            7:  [6.0, 7.2, 8.5, 10.0, 11.5, 13.0],
            8:  [8.3, 9.5, 10.8, 12.2, 13.5, 15.0],
            9:  [9.8, 11.0, 12.5, 14.0, 15.5, 17.0],
            10: [10.5, 12.0, 13.5, 15.0, 16.5, 18.0],
            12: [11.8, 13.5, 15.0, 16.8, 18.5, 20.0]
        };

        met = metTable[roundedSpeed]?.[roundedIncline / 3] || 5;
    }

    // 2. CYCLETTTE 👈 QUI LO INSERISCI
    else if (exercise === "Cyclette") {

        const resistance = Number(resistanceInput.value);

        if (resistance <= 2) met = 3.2;
        else if (resistance <= 4) met = 4.0;
        else if (resistance <= 6) met = 5.2;
        else if (resistance <= 8) met = 6.8;
        else if (resistance <= 10) met = 8.5;
        else met = 10;
    }

    // 3. ALTRE ATTIVITÀ
    else {
        met = metValues[exercise] || 5;
    }

    // 3. CALCOLO CALORIE

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

    if (!cardioName.value.trim() || !minutesInput.value.trim()) {

        alert("COMPILA TUTTI I CAMPI!");

        return;
    }

    if ( Number(minutesInput.value) <= 0) {

        alert("I MINUTI DEVONO ESSERE POSITIVI!");

        return;
    
    }

    if (cardioName.value === "Tapis roulant") {

        if (Number(speedInput.value) < 0) {

            alert("LA VELOCITÀ NON PUÒ ESSERE NEGATIVA!");

            return;
        }

        if (Number(resistanceInput.value) < 0) {

            alert("L'INCLINAZIONE NON PUÒ ESSERE NEGATIVA!");

            return;
        }

    }

    if (cardioName.value === "Cyclette") {

        if (Number(resistanceInput.value) < 0) {

            alert("LA RESISTENZA NON PUÒ ESSERE NEGATIVA!");

            return;
        }

    }

    const weight = prompt("Inserisci il tuo peso corporeo (kg)");

    if (!weight || Number(weight) <= 0) {

        alert("PESO NON VALIDO!");

        return;
    }

    const calories =calculateCalories(cardioName.value, Number(minutesInput.value),Number(weight));

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

    const newName =prompt("Nome esercizio:",exercise.exercise_name);

    const newMinutes = prompt("Minuti:",exercise.minutes);

    const newResistance =prompt("Inclinazione/Resistenza:",exercise.resistance);

    const newNotes =prompt("Note:",exercise.notes);

    if (!newName ||!newMinutes) {

        return;
    }

    if (Number(newMinutes) <= 0) {

        alert("INSERISCI VALORI VALIDI!");

        return;
    }

    exercise.exercise_name = newName;

    exercise.minutes = Number(newMinutes);

    exercise.resistance = newResistance;

    exercise.notes = newNotes;

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