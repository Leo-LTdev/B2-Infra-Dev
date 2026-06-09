const { Sale, Bien, User } = require('../models'); 

exports.createSale = async (req, res) => {
    try {
        const agentId = req.auth.userId; 

        const seller = await User.findByPk(agentId);
        if (!seller || seller.role === 'user') { // verif role
            return res.status(403).json({ message: "Accès refusé : Seuls les professionnels peuvent conclure une vente." });
        }

        const { bienId, buyerName, finalPrice } = req.body;

        const bien = await Bien.findByPk(bienId);
        if (!bien) return res.status(404).json({ message: "Bien introuvable." });
        if (bien.status === 'Vendu') return res.status(400).json({ message: "Déjà vendu." });

        const sale = await Sale.create({
            buyer_name: buyerName,
            final_price: finalPrice,
            sale_date: new Date(),
            bien_id: bien.id,
            agent_id: agentId
        });

        await bien.update({ status: 'Vendu' });

        res.status(201).json({ message: "Transaction validée ! Bien vendu." });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};