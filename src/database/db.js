//para rodar o db  node src/database/db.js
//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no banco de dados
const db =  new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto de banco de dados, para nossas operações
// db.serialize(() => {
//     //com comandos sql:
//     //1: criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     //2: inserir dados na tabela
    
//     const query =`
//             INSERT INTO places(
//                 image,
//                 name,
//                 address,
//                 address2,
//                 state,
//                 city,
//                 items
//             ) VALUES (?,?,?,?,?,?,?);
                
//     `
    
//     const values = [
        
//             "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//                     "Colectoria",
//                     "Guilherme Gemballa, Jardim América",
//                     "Numero 260",
//                     "Santa Catarina",
//                     "Rio do Sul",
//                     "Resíduos Eletrônicos e Lampadas"     
//     ]

//     const values2 = [
        
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//                 "Paperside",
//                 "Guilherme Gemballa, Jardim América",
//                 "Numero 260",
//                 "Santa Catarina",
//                 "Rio do Sul",
//                 "Papéis e papeplão"     
// ]

//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }
    
//     //comentado para ele nao colocar mais nada no bd
//     db.run(query, values2, afterInsertData)

//     //3: consultar dados na tabela
//     db.all(`SELECT * FROM places`, function(err, rows){
//         if(err){
//             return console.log(err)
//         }
        
//         console.log("Aqui estão seus registros: ")
//         console.log(rows)
//     })

        
//     //4: deletar dados na tabela
//     /*db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
//         if(err){
//             return console.log(err)
//         }
        
//         console.log("Registro deletado com sucesso!")
//     })*/
    
// })