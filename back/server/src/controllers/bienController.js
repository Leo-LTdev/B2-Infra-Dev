const { Bien } = require('../models');


exports.createBien = async (req, res) => {
    try {
        const { 
            title,
            description,
            type,
            category,
            price,
            surface_sqm,
            rooms,
            city,
            postal_code,
            agency_id } = req.body;

        const newBien = { 
            title, description, type, category, price, 
            surface_sqm, rooms, city, postal_code, agency_id
        };

        for (const key in newBien) {
            if (!newBien[key]) {
                return res.status(400).json({ message: `Le champ ${key} est requis` });
            }
        }

        const createdBien = await Bien.create(newBien, {
            fields: [
                'title',
                'description', 
                'type', 
                'category', 
                'price', 
                'surface_sqm', 
                'rooms', 
                'city',
                'postal_code', 
                'agency_id'
            ]
        });
        res.status(201).json({ 
            message: "Bien créé avec succès !",
            data: createdBien
        });
        console.log("avant création du bien ")
    } catch (error) {
        console.error("Erreur lors de la création du bien :", error);
        res.status(500).json({ message: "Erreur lors de la création du bien" });
    }

}
