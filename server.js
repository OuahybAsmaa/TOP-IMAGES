const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Clé d'API utilisée
const ACCESS_KEY = 'cnQRsgb4XjC6BuuDVqA8Tt9a2HvV8D214b9UQ4X46ao';

// Middleware pour fichiers statiques
app.use(express.static('public'));

// Route pour récupérer les images
app.get('/images', async (req, res) => {
    try {
        const response = await axios.get('https://api.unsplash.com/photos', {
            headers: { 'Authorization': `Client-ID ${ACCESS_KEY}` },
            params: { order_by: 'popular' }
        });

        const images = response.data.map(image => ({
            id: image.id,
            description: image.description,
            url: image.urls.regular
        }));

        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des images' });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});