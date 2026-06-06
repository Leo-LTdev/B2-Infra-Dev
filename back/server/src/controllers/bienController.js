const { Op } = require ('sequelize');
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

exports.getAllBiens = async (req,res) => {
    try {
    const { prixMin, prixMax, surfaceMin, surfaceMax, lieu, type, order } = req.query;
    const conditions = {};

    if (type && type !== 'tous') conditions.type = type;
    
    if (lieu) {
      conditions.city = { [Op.like]: `%${lieu}%` }; 
    }

    if (prixMin || prixMax) {
      conditions.price = {};
      if (prixMin) conditions.price[Op.gte] = Number(prixMin);
      if (prixMax) conditions.price[Op.lte] = Number(prixMax);
    }

    if (surfaceMin || surfaceMax) {
      conditions.surface_sqm = {};
      if (surfaceMin) conditions.surface_sqm[Op.gte] = Number(surfaceMin);
      if (surfaceMax) conditions.surface_sqm[Op.lte] = Number(surfaceMax);
    }

    console.log("test conditions", conditions)

    const orderValue = order === 'true' ? [['price', 'DESC']] : [['price', 'ASC']];

    const allBien = await Bien.findAll({
      where: conditions,
      order: orderValue
    });

    res.json({ allBien });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
