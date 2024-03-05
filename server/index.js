import express from "express";
import fs from "fs/promises";
import cors from "cors";
import { v4 as uuid } from "uuid";
import "dotenv/config";

const app = express();
const PORT = 3000;
const dbFilePath = "./todos.json";

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const writeDbFile = (dataJson) => fs.writeFile(dbFilePath, JSON.stringify(dataJson))
const readDbFile = async () => JSON.parse(await fs.readFile(dbFilePath, "utf-8"));
    try {
        await readDbFile();
    } catch (err) {
        writeDbFile;
}

app.get("/todos", async (req, res) => {
    try {
        const items = await readDbFile();
        res.json(items);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.post("/todos", async (req, res) => {
    try {
        if (!req.body.title ) {
            throw new Error("Title is required");
        }

        const newTodo = { title: req.body.title, done: false, id: uuid() };
        const todos = await readDbFile();
        const newTodos = [...todos, newTodo];
        await writeDbFile(newTodos);
        res.status(201).json(newTodo);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.patch("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const todos = await readDbFile();
        // Daten mit denen wir die gesuchte Ressource patchen wollen
        const todoPatch = req.body;
        const patchedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, ...todoPatch } : todo
        );

        await writeDbFile(patchedTodos);

        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
    res.end();
});

app.delete("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const todos = await readDbFile();
        const taskToDelete = todos.find((todo) => todo.id === id);
        const index = todos.indexOf(taskToDelete);

        todos.splice(index, 1);

        await writeDbFile(todos);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`listening on ${process.env.BACKEND_URL}`);
});
