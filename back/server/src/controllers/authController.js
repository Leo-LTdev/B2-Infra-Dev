const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "utilisateur non trouvé" });
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,     
            { expiresIn: '24h' }                  
        );

        res.status(200).json({ 
            message: "Connexion réussie !",
            userId: user.pseudo,
            token: token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
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

        if (!email || !lastname || !firstname || !password || !confirmPassword || !role) {
            return res.status(400).json({ message: "Toute les donnée non pas été envoyé" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
        }

        const isAlreadyExist = await User.findOne({ where: { email } });
        
        if (isAlreadyExist) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            lastname,
            firstname, 
            email,
            password : hashedPassword, 
            role,
            agencyId
        });

        res.status(201).json({ 
            message: "Utilisateur créé avec succès !",
            userId: newUser.id 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'inscription." });
    }
};
