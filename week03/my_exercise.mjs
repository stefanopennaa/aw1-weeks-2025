import dayjs from "dayjs";    // Importo il modulo dayjs per la gestione delle date
import sqlite from "sqlite3"; // Importo il modulo sqlite3 per la gestione dei database sqlite

const db = new sqlite.Database("questions.sqlite", (err) => { if (err) throw err; }); // Apertura del database "questions.sqlite"

// Oggetto rappresentante le domande (con le sue proprietà e metodi)
function Question(id, text, email, userId, date) {
    this.id = id;
    this.text = text;
    this.email = email;
    this.userId = userId;
    this.date = dayjs(date);

    // Metodo per prendere tutte le risposte della Question instanziata (3)
    this.getAnswers = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT answer.*, user.email FROM answers JOIN user ON answer.authorId = user.id WHERE answer.questionId = ?";
            db.all(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row !== undefined) {
                    const answers = rows.map(row => new Answer(row.id, row.text, row.email, row.authorId, row.date, row.score));
                    resolve(answers);
                }
                else {
                    resolve("No answers found.");
                }
            });
        });
    }

    // Metodo per aggiungere una nuova risposta di un autore esistente alla Question instanziata (4)
    this.addAnswer = (answer) => { }

    // Metodo per votare una risposta esistente, con up = +1 e down = -1 (5)
    this.voteAnswer = (id, value) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE answer SET score = score + ? WHERE id = ?";
            const delta = value === "up" ? 1 : value === "down" ? -1 : 0;
            db.run(sql, [delta, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
}

// Oggetto rappresentante le risposte (con le sue proprietà)
function Answer(id, text, email, userId, date, score = 0) {
    this.id = id;
    this.text = text;
    this.email = email;
    this.userId = userId;
    this.score = score;
    this.date = dayjs(date);
}

// Oggetto rappresentante la lista di domande (con i suoi metodi)
function QuestionList() {

    // Metodo per recuperare una singola Question dato il suo ID (1)
    this.getQuestion = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT question.*, user.email FROM question JOIN user ON question.authorId = user.id WHERE question.id = ?";
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row !== undefined) {
                    resolve(new Question(row.id, row.text, row.email, row.authorId, row.date));
                }
                else {
                    resolve("Question not found.");
                }
            });
        });
    }

    // Metodo per aggiungere una nuova Question di un autore esistente (2)
    this.addQuestion = (question) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO question (text, authorId, date) VALUES (?, ?, ?)";
            db.run(sql, [question.text, question.userId, question.date.toISOString()], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }
}

// Funzione per il test delle classi
async function main() {
    const ql = new QuestionList();
    console.log(await ql.getQuestion(1));
}

main();