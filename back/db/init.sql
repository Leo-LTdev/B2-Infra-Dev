USE ma_base_de_donnees;
-- Table des Agences 
CREATE TABLE agencies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    is_headquarter BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des Utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Destiné à accueillir un mot de passe hashé
    role ENUM('Direction', 'Commercial', 'Communication & Marketing', 'Administratif - RH - Juridique', 'IT et Support') NOT NULL,
    agency_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des Biens Immobiliers
CREATE TABLE biens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    type ENUM('Residentiel', 'Professionnel') NOT NULL,
    category ENUM('Maison', 'Appartement', 'Bureau', 'Local commercial') NOT NULL,
    price DECIMAL(12, 2) NOT NULL, 
    surface_sqm INT NOT NULL,
    rooms INT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    status ENUM('Disponible', 'Vendu', 'Reserver') DEFAULT 'Disponible',
    agency_id INT NOT NULL,
    image_url varchar(255) not null DEFAULT "./uploads/default.jpg",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des Ventes 
CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bien_id INT NOT NULL UNIQUE,
    agent_id INT NOT NULL, -- Le commercial qui a fait la vente
    buyer_name VARCHAR(150) NOT NULL,
    final_price DECIMAL(12, 2) NOT NULL,
    sale_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bien_id) REFERENCES biens(id) ON DELETE RESTRICT,
    FOREIGN KEY (agent_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================================
-- 4. INSERTION DE DONNÉES DE TEST (Agences, Utilisateurs, Biens, Ventes)
-- ============================================================================

-- Insertion du Siège et de quelques agences de test
INSERT INTO agencies (name, city, address, is_headquarter) VALUES
('Siège Social Ymmo', 'Aix-en-Provence', '10 Rue de la République', TRUE),
('Ymmo Agence Paris', 'Paris', '45 Avenue des Champs-Élysées', FALSE),
('Ymmo Agence Lyon', 'Lyon', '12 Place Bellecour', FALSE),
('Ymmo Agence Marseille', 'Marseille', '8 Quai du Port', FALSE);

-- Insertion de Biens Immobiliers
INSERT INTO biens (title, description, type, category, price, surface_sqm, rooms, city, postal_code, status, agency_id) VALUES
('Bel Appartement T3 Lumineux', 'Superbe appartement proche commerces', 'Residentiel', 'Appartement', 245000.00, 68, 3, 'Paris', '75011', 'Vendu', 2),
('Maison Contemporaine avec Piscine', 'Grande maison familiale hors lotissement', 'Residentiel', 'Maison', 520000.00, 140, 5, 'Lyon', '69006', 'Disponible', 3),
('Bureaux d''entreprise modernes', 'Plateau de bureaux aménagés en plein centre', 'Professionnel', 'Bureau', 890000.00, 210, 8, 'Aix-en-Provence', '13100', 'Disponible', 1),
('Local Commercial Plein Centre', 'Fonds de commerce idéalement situé', 'Professionnel', 'Local commercial', 135000.00, 45, 2, 'Marseille', '13001', 'Vendu', 4);

INSERT INTO users (lastname, firstname, email, password, role, agency_id) VALUES
('Dupont', 'Jean', 'jean.dupont@ymmo.com', '$2b$10$...', 'Commercial', 1),
('Martin', 'Sophie', 'sophie.martin@ymmo.com', '$2b$10$...', 'Commercial', 2),
('Bernard', 'Luc', 'luc.bernard@ymmo.com', '$2b$10$...', 'Commercial', 3);

-- Insertion de l'historique des Ventes 
INSERT INTO sales (bien_id, agent_id, buyer_name, final_price, sale_date) VALUES
(1, 2, 'M. et Mme. Smith', 240000.00, '2026-03-15'),
(4, 3, 'Société SCI Logis', 130000.00, '2026-04-22');