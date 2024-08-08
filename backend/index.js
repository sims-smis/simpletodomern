var Express=require('express');
var Mongoclient=require('mongodb').MongoClient;
var cors=require('cors');
const multer=require('multer');

var app=Express();
app.use(cors());


var CONNECTION_STRING="mongodb+srv://simranmeena2004:<password>@cluster0.xcrwojb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME="todoappdb";
var database;


app.listen(5038, () => {
    Mongoclient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            return;
        }
        database = client.db(DATABASENAME);
        console.log("Connected to database");
    });
});

app.get('/api/todoapp/GetNotes',(req,res)=>{
    database.collection('todoappcollection').find({}).toArray((error,result)=>{
        res.send(result); 
    })
})


app.post('/api/todoapp/AddNotes',multer().none(), (req,res)=>{
    database.collection('todoappcollection').count({},function(err,numberOfDocs){
        database.collection('todoappcollection').insertOne({
            id: numberOfDocs+1,
            description: req.body.newNotes
        });
        res.json('Added successfully');
    });
})


app.delete('/api/todoapp/DeleteNotes',(req,res)=>{
    const id2 = parseInt(req.query.id, 10);
    database.collection('todoappcollection').deleteOne({
        id:id2
    });
    res.json(req.query.id);
})