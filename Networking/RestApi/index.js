import express from "express";
import bodyParser from "body-parser";

const app = express();


//middleware (bodyparser -> which will parse the body of the request (parsing the data means converting it into a usable format from stringified format(stringified data means data in string format)))
app.use(bodyParser.json());

app.all("/", (req, res) => {
    // console.log('Request >', req);
    // console.log('Response >', res);
 
    res.send(`I'm Up!`);
})

//gonna create In-Memory DB
const todos = [
    {
        id: 1,
        title: "Todo 1",
        description: "Description 1",
        completed: false
    },
    {
        id: 2,
        title: "Todo 2",
        description: "Description 2",
        completed: true
    }
];

//READ 
app.get("/todos", (req, res)=>{
    res.json(todos);
})

//CREATE
 app.post("/todos", (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.status(201).json({
        message: "Todo created successfully",
        
    });
 })


//UPDATE
app.put("/todos/:id", (req, res)=> {
    const todoId = Number(req.params.id);

    const newTodoData = req.body;
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
        todos[todoIndex] = {
            ...todos[todoIndex], //spreading the existing todo (or) id: todoId (since we don't get the id in the request body)
            ...newTodoData,
        };
        res.json({
            message: "Todo updated successfully",
        });
    }else{
        res.status(400).json({
            message: "Todo id not found",
        });
    }
    

})


//DELETE
app.delete("/todos/:id", (req, res) => {
    const todoId = Number(req.params.id);
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.json({
            message: "Todo deleted successfully",
        });
    }
})


const PORT = 5111;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})