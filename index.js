const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

let user = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];

app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.get('/users', (req, res) => res.json(user));

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const User = user.find(u => u.id === userId);
    if (User) {
        res.json(User);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(PORT, "localhost", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});