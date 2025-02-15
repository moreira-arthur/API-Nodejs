import {sql} from './db.js'

sql `
CREATE TABLE FOTOS (
    id          TEXT PRIMARY KEY,
    title       TEXT,
    description TEXT,
    resolution    INTEGER
    );
`.then(()=> 
    console.log("finish")
)