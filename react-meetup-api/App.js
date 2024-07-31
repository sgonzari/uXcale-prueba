const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3030;

// Middleware que parsea el cuerpo de la solicitudes como JSON
app.use(express.json());

// Middleware que permite CORS
app.use(cors());

// Devuelve todos los meetups
app.get('/meetups', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error leyendo el archivo JSON' });
        }
        const meetups = JSON.parse(data);
        res.json(meetups);
    });
});

// Crea un nuevo meetup
app.post('/meetups', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error leyendo el archivo JSON' });
        }
        const meetups = JSON.parse(data);
        const nuevoMeetup = {
            id: `m${meetups.length + 1}`,
            ...req.body,
            favourite: req.body.favourite ?? false
        };
        meetups.push(nuevoMeetup);
        fs.writeFile('data.json', JSON.stringify(meetups, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error escribiendo el archivo JSON' });
            }
            res.status(201).json(nuevoMeetup);
        });
    });
});

// Actualiza un meetup
app.put('/meetups/:id', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error leyendo el archivo JSON' });
        }
        let meetups = JSON.parse(data);
        const index = meetups.findIndex(m => m.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'meetup no encontrado' });
        }
        meetups[index] = { ...meetups[index], ...req.body };
        fs.writeFile('data.json', JSON.stringify(meetups, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error escribiendo el archivo JSON' });
            }
            res.json(req.body);
        });
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
