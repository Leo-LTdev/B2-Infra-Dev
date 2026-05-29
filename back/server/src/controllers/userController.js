const { User } = require('../models/');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

exports.getAllUser = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const allUser = await User.findAll({ where: { id: {[Op.ne]: userId}}})

        res.status(200).json({ 
            message: "Tous les utilisateur on été trouver",
            users: allUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await tryGetUser(userId);
        res.status(200).json({ 
            message: "Utilisateur : ",
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const {
            lastname,
            firstname, 
            email,
            password, 
            confirmPassword,
            role,
            agencyId
         } = req.body;

        const userId = req.params.id

        const user = await tryGetUser(userId);

        if (!email || !lastname || !firstname || !password || !confirmPassword || !role) {
            return res.status(400).json({ message: "Toute les donnée non pas été envoyé" });
        }

        if (password != confirmPassword) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await user.update({
            lastname: lastname || user.lastname,
            firstname: firstname || user.firstname,
            email: email || user.email,
            password: hashedPassword || user.hashedPassword,
            role: role || user.role,
            agencyId: agencyId || user.agencyId
        })

        res.status(200).json({ 
            message: "Utilisateur modifier avec succes : ",
            user: user
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {

        const userId = req.params.id
        
        const user = await tryGetUser(userId);
        
        await user.destroy();
         res.status(200).json({ 
            message: "Utilisateur éffacer avec succés"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

async function tryGetUser(id){
    const user = await User.findOne({ where: { id: id }})
    if (!user) {
        return res.status(404).json({ message: "User non trouvé"});
    }
    return user;
}