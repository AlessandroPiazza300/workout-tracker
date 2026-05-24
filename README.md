# 🏋️ Workout Tracker

Web application sviluppata per la gestione e il monitoraggio dei workout e degli esercizi tramite browser.  
Il progetto permette di creare workout personalizzati, aggiungere tutti gli esercizi svolti durante l'allenamento, confrontare risultati e visualizzare statistiche attraverso grafici dinamici.

Il progetto è stato sviluppato come applicazione Full Stack utilizzando Node.js, Express, SQLite e JavaScript Vanilla.

-------------------------------------------------------------------------------------

# 🎯 Obiettivo del progetto

L’obiettivo dell’applicazione è fornire un sistema semplice ed intuitivo per:

- creare workout
- salvare esercizi
- monitorare pesi e progressi
- confrontare esercizi nel tempo
- visualizzare statistiche e grafici
- interrogare un database tramite browser

-------------------------------------------------------------------------------------

# 💻 Tecnologie utilizzate

## Frontend
- HTML5
- CSS3
- JavaScript Vanilla

## Backend
- Node.js
- Express.js

## Database
- SQLite3

## Librerie esterne
- Chart.js

-------------------------------------------------------------------------------------

# 📂 Struttura del progetto

```text
project/
│
├── client/
│   ├── index.html
│   ├── workout.html
│   ├── comparison.html
│   ├── script.js
│   ├── workout.js
│   ├── comparison.js
│   └── style.css
│
├── server/
│   ├── app.js
│   └── database/
│       └── db.js
│
├── package.json
├── package-lock.json
└── README.md
```

-------------------------------------------------------------------------------------

# ⚙️ Installazione del progetto

## 1. Clonare il repository

```bash
git clone URL_DEL_REPOSITORY
```

-------------------------------------------------------------------------------------

## 2. Entrare nella cartella del progetto

```bash
cd NOME_PROGETTO
```

-------------------------------------------------------------------------------------

## 3. Installare le dipendenze

```bash
npm install
```

-------------------------------------------------------------------------------------

## 4. Avviare il server

```bash
npm start
```

oppure:

```bash
node server/app.js
```

-------------------------------------------------------------------------------------

# 🎬 Avvio applicazione

Una volta avviato il server aprire il browser su:

```text
http://localhost:3000
```

-------------------------------------------------------------------------------------

# 🗄️ Database

Il database utilizza SQLite3.

Sono presenti due tabelle principali:

-------------------------------------------------------------------------------------

## prima tabella: `workouts`

| Campo | Tipo |
|-------|------|
| id | INTEGER |
| name | TEXT |
| date | TEXT |
| duration | INTEGER |

Contiene le informazioni generali del workout.

-------------------------------------------------------------------------------------

## seconda tabella: `exercises`

| Campo | Tipo |
|-------|------|
| id | INTEGER |
| workout_id | INTEGER |
| exercise_name | TEXT |
| sets | INTEGER |
| reps | INTEGER |
| weight | REAL |
| notes | TEXT |

Contiene gli esercizi associati ai workout.

-------------------------------------------------------------------------------------

## Relazione database

- Un workout può contenere più esercizi
- Relazione uno-a-molti
- Utilizzo di:
```sql
ON DELETE CASCADE
```
per eliminare automaticamente gli esercizi associati ad un workout eliminato.

-------------------------------------------------------------------------------------

# Funzionalità principali

# 🏋️ Gestione workout

L’applicazione permette di:

- creare workout
- modificare workout
- eliminare workout
- cercare workout tramite nome
- filtrare workout per data

-------------------------------------------------------------------------------------

# 💪 Gestione esercizi

Per ogni workout è possibile:

- aggiungere esercizi
- modificare esercizi
- eliminare esercizi
- inserire:
  - serie
  - ripetizioni
  - peso
  - note

Viene inoltre calcolato automaticamente il volume tramite la formula:
```text
serie × ripetizioni × peso
```

-------------------------------------------------------------------------------------

# 📈 Dashboard statistiche

La dashboard mostra:

- numero totale workout
- minuti totali allenamento
- durata media workout
- badge obiettivi raggiunti

-------------------------------------------------------------------------------------

# 📊 Grafici dinamici

Il progetto utilizza Chart.js per:

- grafico durata workout
- grafico confronto esercizi

I grafici vengono aggiornati dinamicamente tramite JavaScript.

-------------------------------------------------------------------------------------

# 🔎 Confronto esercizi

La pagina di confronto permette di:

- selezionare più esercizi
- cercare esercizi tramite nome
- ordinare per:
  - nome
  - peso
  - data
- visualizzare andamento dei pesi tramite grafico, ottimo per confrontare lo stesso esercizio in modo tale da vedere se c'è un miglioramento per quanto riguarda il peso usato.

-------------------------------------------------------------------------------------

# 🌐 API REST

Il backend espone API REST sviluppate con Express.

-------------------------------------------------------------------------------------

## 🏋🏼‍♂️ Workout

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | /workouts | Ottiene tutti i workout |
| POST | /workouts | Crea un workout |
| PUT | /workouts/:id | Modifica un workout |
| DELETE | /workouts/:id | Elimina un workout |

-------------------------------------------------------------------------------------

## 🏋🏼‍♂️ Exercises

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | /exercises/:workoutId | Ottiene esercizi workout |
| POST | /exercises | Crea esercizio |
| PUT | /exercises/:id | Modifica esercizio |
| DELETE | /exercises/:id | Elimina esercizio |

-------------------------------------------------------------------------------------

# Comunicazione client-server

La comunicazione tra frontend e backend avviene tramite:

- Fetch API
- AJAX
- JSON

Un sempio di questa comunicazione è:

```javascript
fetch("/workouts")
```

-------------------------------------------------------------------------------------

# Validazione dati

Sono stati implementati controlli sia lato client che lato server per:

- campi obbligatori
- numeri negativi
- valori non validi

-------------------------------------------------------------------------------------

# 🎨 Interfaccia grafica

L’interfaccia è stata sviluppata manualmente tramite CSS personalizzato senza l’utilizzo di framework grafici come Bootstrap.

Sono presenti:

- navbar
- cards
- modali
- tabelle responsive
- grafici
- layout responsive

-------------------------------------------------------------------------------------

# 📚 Concetti del corso utilizzati

Il progetto utilizza numerosi argomenti affrontati durante il corso:

- Web & Internet
- URI e URL
- HTTP
- HTML
- CSS
- JavaScript
- REST API
- AJAX
- JSON
- sviluppo dinamico client-side
- Node.js
- database relazionali
- Git
- Markdown
- grafica web

-------------------------------------------------------------------------------------

# 👨‍💻 Autore

Alessandro Piazza

Progetto sviluppato per il corso di Tecnologie per le Pallicazioni Web a cura di Goldoni Emanuele.

-------------------------------------------------------------------------------------

# 📄 Licenze librerie utilizzate

- Express.js
- SQLite3
- Chart.js

Tutte le librerie utilizzate sono open source e utilizzate nel rispetto delle relative licenze.