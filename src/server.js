//para rodar o server, dentro do bash npm start
//npm instalados:
//npm install express
//npm install nodemon
//npm install nunjucks

const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js") // ta recebendo o db do banco nessa const db

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true //tirar o cache enquanto desenvolve
})

//configurar caminhos da minha aplicação
//páginal inicial
//req: requisição (pergunta)
//res: resposta
server.get("/", (req,res) =>{
    //res.send("cheguei aqui")
    //res.sendFile(__dirname + "/views/index.html")
    return res.render("index.html")

})

server.get("/create-point", (req,res) =>{
    //req.query: Query strings da nossa url
    console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) =>{
    //req.body: o corpo do nosso formulário
    console.log(req.body)
    //inserir dados no banco
    const query =`
            INSERT INTO places(
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
                
    `
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2, 
        req.body.state, 
        req.body.city,
        req.body.items        
                
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        //mandando de volta pra pagina create point
        return res.render("create-point.html", {saved: true})
    }
    
    //comentado para ele nao colocar mais nada no bd
    db.run(query, values, afterInsertData)
    
})

server.get("/search-results", (req,res) =>{
    // consultar dados na tabela
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})
        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })
   
})

//ligar o servidor
server.listen(3000)