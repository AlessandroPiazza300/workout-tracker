# Progettazione Database CARDIO

OBIETTIVO:
La nuova funzionalità CARDIO permetterà all'utente di registrare attività cardiovascolari come:

- Corsa
- Camminata
- Tapis roulant
- Cyclette
- Salto con la corda

Per ogni attività verranno salvati i dati necessari al calcolo delle calorie consumate.

-------------------------------------------------------------------------------------

# 🧮 Tabella cardio_exercises

| Campo | Tipo | Descrizione |
|---------|---------|---------|
| id | INTEGER | Identificatore univoco |
| exercise_name | TEXT | Nome esercizio cardio |
| minutes | INTEGER | Durata attività |
| resistance | REAL | Inclinazione o resistenza |
| user_weight | REAL | Peso corporeo |
| calories | REAL | Calorie calcolate |
| notes | TEXT | Note dell'utente |

-------------------------------------------------------------------------------------

# Operazioni previste

La tabella dovrà supportare:

- Inserimento di nuovi esercizi cardio
- Visualizzazione esercizi
- Modifica esercizi
- Eliminazione esercizi

-------------------------------------------------------------------------------------

# Database utilizzato

SQLite3