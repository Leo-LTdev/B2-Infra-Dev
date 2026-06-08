const { Op } = require ('sequelize');
const { Bien } = require('../models');
const multer = require ('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

exports.upload = multer({ storage: storage })

exports.createBien = async (req, res) => {
    try {
        const { 
            title,
            description,
            type,
            category,
            price,
            surface,
            rooms,
            city,
            postalCode,
            agentId } = req.body;

        const newBien = { 
            title, type, category, price, 
            surface, rooms, city, postalCode, agentId
        };

        for (const key in newBien) {
            if (!newBien[key]) {
                return res.status(400).json({ message: `Le champ ${key} est requis` });
            }
        }

        if (!req.file) {
            return res.status(400).json({ message: "Une image pour l'annonce est requise" });
        }

        const image_url = `/uploads/${req.file.filename}`;

        const createdBien = await Bien.create({ 
            title, 
            description: description || null,
            type, 
            category, 
            price: Number(price), 
            surface_sqm: Number(surface),      
            rooms: Number(rooms), 
            city, 
            postal_code: postalCode,          
            agency_id: Number(agentId),       
            image_url: image_url            
        });
        
        res.status(201).json({ 
            message: "Bien créé avec succès !",
            data: createdBien
        });

    } catch (error) {
        console.error("Erreur lors de la création du bien :", error);
        res.status(500).json({ message: "Erreur lors de la création du bien" });
    }
}

exports.getAllBiens = async (req,res) => {
    try {
    const { prixMin, prixMax, surfaceMin, surfaceMax, lieu, type, order } = req.query;
    const conditions = {};

    conditions.status = 'Disponible';

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

exports.getBienById = async (req, res) => {
  const bienId = req.params.id

  console.log(bienId);
}