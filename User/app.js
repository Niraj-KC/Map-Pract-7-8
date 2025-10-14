import express from 'express';
import cors from "cors";
import { sendEmailJob } from './producer.js';

const app = express();

app.use(cors());
app.use(express.json());


let users = [
  { id: 1, name: "Alice-1", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

let curr_id = users.length + 1;

app.get('/', (req, res) => {
  res.json(users);
});

app.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

app.post('/', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: curr_id++,
    name,
    email
  };
  users.push(newUser);
  sendEmailJob(email, "Welcome to the app", `Hello ${name}, \n We are glad to have on our platform`)
  res.status(201).json(newUser);
});

app.put('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  const { name, email } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
});

app.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("User not found");

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});


export default app;
