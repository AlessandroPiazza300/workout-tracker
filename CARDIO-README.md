# 🫀 CARDIO MODE - Workout Tracker
Descrizione Funzionalità
La nuova funzionalità “CARDIO” verrà aggiunta alla schermata principale della web app Workout Tracker tramite un nuovo pulsante cliccabile chiamato:
* CARDIO

Quando l’utente cliccherà il pulsante verrà aperta una nuova pagina dedicata agli esercizi aerobici come per esempio corsa, camminata, nuoto, ciclismo. Il meccanismo  della nuova funziona sarà simile a quello della pagina confronto e quello della pagina esercizi. 

-------------------------------------------------------------------------------------

# 🎯 Obiettivo della nuova funzione
La nuova modalità CARDIO permetterà all’utente di:
* aggiungere esercizi cardio
* monitorare i minuti di allenamento
* salvare inclinazione o resistenza
* inserire note personali
* modificare esercizi
* eliminare esercizi
* visualizzare le calorie bruciate automaticamente

-------------------------------------------------------------------------------------

# Nuova Pagina
Verrà creata una nuova pagina HTML chiamata:
* cardio.html
Questa pagina sarà collegata alla homepage tramite il nuovo pulsante CARDIO.

-------------------------------------------------------------------------------------

# Nuova Tabella Database

Verrà creata una nuova tabella SQLite chiamata:
cardio_exercises
La tabella conterrà i seguenti campi:

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| id | INTEGER | ID automatico |
| exercise_name | TEXT | nome esercizio cardio |
| minutes | INTEGER | Minuti attività |
| resistance | REAL | inclinazione o resistenza |
| user_weight | REAL | Peso corporeo utente |
| calories | REAL | Calorie calcolate automaticamente |
| notes | TEXT | Note personali |

-------------------------------------------------------------------------------------

Obiettivo della tabella
La tabella permetterà di:
* salvare esercizi cardio
* monitorare durata allenamento
* gestire resistenza/inclinazione
* calcolare calorie automaticamente
* salvare note personali
* modificare esercizi
* eliminare esercizi

-------------------------------------------------------------------------------------

Tipi di dato utilizzati
INTEGER
Utilizzato per:
* id
* minutes
Serve per salvare numeri interi.



REAL
Utilizzato per:
* resistance
* user_weight
* calories
Serve per salvare numeri decimali.



TEXT
Utilizzato per:
* exercise_name
* notes
Serve per salvare dati testuali.

-------------------------------------------------------------------------------------

# 📈 Funzionalità della pagina CARDIO
Aggiunta esercizio cardio
L’utente potrà compilare:
* nome esercizio
* minuti
* inclinazione/resistenza
* note

Quando necessario il sistema chiederà anche:
* peso corporeo dell’utente
tramite popup.

-------------------------------------------------------------------------------------

# 🧮 Calcolo calorie automatico

La web app calcolerà automaticamente le calorie bruciate utilizzando formule cardio basate su:
* tipo esercizio
* minuti
* peso corporeo
* intensità
Esempi esercizi supportati:
* camminata
* corsa
* cyclette
* tapis roulant
* salto corda
* bicicletta
* ellittica

-------------------------------------------------------------------------------------

# 🧮 Formula calcolo delle calorie

Il calcolo verrà effettuato utilizzando il sistema MET (Metabolic Equivalent of Task).
Formula:
calorie = MET × peso corporeo × durata in ore
Esempio:
* MET corsa moderata = 8
* peso utente = 80 kg
* durata = 30 minuti
calorie = 8 × 80 × 0.5 = 320 kcal

-------------------------------------------------------------------------------------

# Tabella HTML
La pagina mostrerà una tabella contenente:
| Colonna |
|---------|
| Nome esercizio |
| Minuti |
| Inclinazione/Resistenza |
| Calorie |
| Note |
| Azioni |

-------------------------------------------------------------------------------------

# 📈 Azioni disponibili
Per ogni esercizio cardio sarà possibile:
* modificare dati
* eliminare esercizio
tramite pulsanti “Modifica” ed “Elimina”.

-------------------------------------------------------------------------------------

# 🔙 Pulsante ritorno
La pagina CARDIO conterrà anche un pulsante:
* TORNA ALLA HOME
che riporterà l’utente alla schermata principale.

-------------------------------------------------------------------------------------

# 📁 File che verranno creati
Frontend
* cardio.html
* cardio.js

Backend
* nuove route Express in app.js

Database
* nuova tabella SQLite cardio_exercises

CSS
* nuove classi aggiunte in style.css

-------------------------------------------------------------------------------------

# 💻 Tecnologie utilizzate
La nuova funzionalità utilizzerà:
* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* SQLite
* Fetch API

-------------------------------------------------------------------------------------

# 🎯 Obiettivo tecnico
La nuova funzione servirà ad ampliare la web app Workout Tracker aggiungendo il monitoraggio degli allenamenti aerobici con calcolo automatico delle calorie e gestione completa CRUD.
CRUD significa:
* Create
* Read
* Update
* Delete

-------------------------------------------------------------------------------------

# 👨🏼‍💻 Pianificazione sviluppo
FASE 1

* Progettazione README e struttura database.

FASE 2

* Creazione e test query SQL tramite DB Browser for SQLite.

FASE 3

* Sviluppo frontend HTML/CSS/JavaScript.

FASE 4

* Sviluppo backend Express.js e collegamento SQLite.

FASE 5

* Test finale funzionalità cardio.
