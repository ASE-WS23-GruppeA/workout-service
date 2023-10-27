const express = require('express');

const app = express();

app.get('/exersices', (req, res) => {
    res.send('<h1>Workout Service<h1>');
});

app.listen(3000);