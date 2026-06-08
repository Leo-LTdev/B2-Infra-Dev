const { Agency, User } = require('../models');

exports.getAllAgencies = async (req, res) => {
    try {
        const agencies = await Agency.findAll();
        
        res.status(200).json(agencies);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserAgency = async (req, res) => {
    try {
        const { id } = req.params;
        const { agencyId } = req.body;

        if (!agencyId) {
            return res.status(400).json({ message: "L'ID de l'agence est requis" });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "utilisateur non trouvé" });
        }

        user.agencyId = agencyId;
        await user.save();

        res.status(200).json({ 
            message: "L'agent a été rattaché a sa nouvelle agence avec succès !",
            userId: user.id,
            agencyId: user.agencyId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors du rattachement a l'agence." });
    }
};

exports.createAgency = async (req, res) => {
    try {
        const { name, city, address, isHeadquarter } = req.body;

        if (!name || !city || !address) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
        }

        const newAgency = await Agency.create({
            name,
            city,
            address,
            isHeadquarter: isHeadquarter || false
        });

        res.status(201).json({
            message: "Agence créée avec succès !",
            agency: newAgency
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de l'agence : " + error.message });
    }
};