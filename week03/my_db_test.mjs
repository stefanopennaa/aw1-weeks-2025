import sqlite from "sqlite3"; // Importo il modulo sqlite3 per la gestione dei database sqlite

const db = new sqlite.Database("questions.sqlite", (err) => {if (err) throw err;}); // Apertura del database

let sql = "SELECT * FROM answer"; // Query sql da eseguire

let results = []; // Array in cui inserire i risultati

// Eseguo la query sql e inserisco i risultati in results
db.all(sql, (err, rows) => {
    if (err) throw err;
    for (let row of rows) {
        // console.log(row);
        results.push(row);
    }
});

// Questo pezzo di codice non restituisce nulla in quanto la riga "results.push(row);" viene eseguita in modo asincrono
for (let r of results) {
    console.log(r);
}

// Dobbiamo necessariamente inserire il codice che stampa i risultati all'interno della callback della query
// in modo da garantire che i risultati siano disponibili al momento della stampa
