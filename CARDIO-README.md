# ❤️ Cardio Tracker

## Descrizione

Il modulo **Cardio Tracker** permette all'utente di registrare, visualizzare, modificare ed eliminare le attività aerobiche svolte durante gli allenamenti.

Ogni attività viene salvata all'interno del database SQLite e il consumo calorico viene calcolato automaticamente mediante la formula basata sul valore **MET (Metabolic Equivalent of Task)**.

Il modulo è stato sviluppato utilizzando:

- HTML5
- CSS3
- JavaScript (ES6)
- Node.js
- Express.js
- SQLite

---


# 🎯 Obiettivo della nuova funzione

La nuova modalità CARDIO permetterà all’utente di:

- aggiungere una nuova attività cardio;
- visualizzare tutte le attività salvate;
- modificare un'attività esistente;
- eliminare un'attività;
- calcolare automaticamente le calorie consumate;
- salvare tutti i dati nel database SQLite.

---


# Attività disponibili

L'utente seleziona l'attività tramite un menu a tendina, evitando errori di digitazione e garantendo un calcolo corretto del valore MET.

Le attività disponibili sono:

- Tapis roulant 
- Cyclette 
- Bicicletta lenta
- Bicicletta normale
- Bicicletta veloce
- Scale
- Camminata lenta
- Camminata normale
- Camminata veloce
- Mountain bike
- Corsa lenta
- Corsa normale
- Corsa veloce
- Nuoto
- Acquagym
- Salto con la corda
- Calcio
- Tennis
- Basket
- Pallavolo
- Pattinaggio
- Zumba
- Danza

---


# Gestione dinamica dei campi

L'interfaccia modifica automaticamente i campi compilabili in base all'attività selezionata.

## 🏃🏼 Tapis roulant 

Per il tapis roulant l'utente deve inserire:

- minuti;
- velocità (km/h);
- inclinazione;
- note (facoltative);
- peso corporeo.

---


## 🚴🏻 Cyclette 

Per la cyclette l'utente deve inserire:

- minuti;
- livello di resistenza;
- note (facoltative);
- peso corporeo.

Il campo **velocità** viene automaticamente disabilitato.

---


## Tutte le altre attività

Per tutte le altre attività l'utente deve inserire solamente:

- minuti;
- note (facoltative);
- peso corporeo.

I campi **velocità** e **resistenza/inclinazione** vengono automaticamente disabilitati.

---


# 🔥 Calcolo delle calorie

Le calorie vengono calcolate automaticamente utilizzando la seguente formula:

**Calorie = MET × Peso × (Minuti / 60)**

dove:

- MET rappresenta il consumo energetico dell'attività;
- Peso è il peso corporeo inserito dall'utente;
- Minuti rappresentano la durata dell'attività.

Il risultato finale viene arrotondato all'intero più vicino.

---


# Calcolo del MET

Il valore MET viene determinato in modo differente a seconda dell'attività selezionata.

---


# Attività standard

Per tutte le attività aerobiche viene utilizzata una tabella contenente valori medi dei MET implementata tramite un oggetto JavaScript (`metValues`).

Quando l'utente seleziona un'attività dal menu a tendina, il programma recupera automaticamente il relativo valore MET.


## 🏃🏼 Tapis roulant

Per il tapis roulant il valore MET dipende contemporaneamente da:

- velocità;
- inclinazione.

La velocità inserita viene arrotondata al valore intero più vicino.

L'inclinazione viene approssimata ai livelli:

- 0
- 3
- 6
- 9
- 12
- 15

Successivamente il programma consulta una tabella contenente tutti i valori MET in funzione della velocità e dell'inclinazione selezionate.

Questo permette di ottenere un calcolo del consumo calorico più preciso.

---


## 🚴🏻 Cyclette

Per la cyclette il valore MET viene determinato esclusivamente dal livello di resistenza inserito dall'utente.

All'aumentare della resistenza aumenta anche il valore MET utilizzato nel calcolo delle calorie.

---


# Comunicazione Client-Server

Il frontend comunica con il backend tramite API REST sviluppate con Express.

Sono stati implementati i seguenti endpoint:

| Metodo | Endpoint | Descrizione |
|----------|----------|-------------|
| GET | /cardio | Restituisce tutte le attività cardio |
| POST | /cardio | Inserisce una nuova attività |
| PUT | /cardio/:id | Modifica un'attività esistente |
| DELETE | /cardio/:id | Elimina un'attività |

---


# Nuova Tabella Database

Verrà creata una nuova tabella SQLite chiamata:
cardio_exercises
La tabella conterrà i seguenti campi:

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| id | INTEGER | ID automatico |
| exercise_name | TEXT | nome esercizio cardio |
| minutes | INTEGER | Minuti attività |
|speed   | INTEGER   | velocità |
| resistance | REAL | inclinazione o resistenza |
| user_weight | REAL | Peso corporeo utente |
| calories | REAL | Calorie calcolate automaticamente |
| notes | TEXT | Note personali |

---


# Aggiornamento automatico della tabella

Dopo ogni inserimento, modifica o cancellazione viene richiamata automaticamente la funzione `loadCardio()`, che:

1. invia una richiesta GET al server;
2. recupera tutte le attività presenti nel database;
3. aggiorna automaticamente la tabella senza ricaricare la pagina.

---


# Controlli implementati

Prima del salvataggio vengono effettuati diversi controlli:

- verifica che sia stata selezionata un'attività;
- verifica che i minuti siano maggiori di zero;
- verifica che il peso corporeo inserito sia valido;
- gestione degli eventuali errori restituiti dal server;
- aggiornamento dell'interfaccia solo in caso di operazione completata con successo.
