USE ma_base_de_donnees;

-- Création de la table Utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    pseudo VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table projet
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id INT,
    CONSTRAINT FK_owner_id FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table Taches
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_id INT,
    CONSTRAINT FK_project_id FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    assigned_to INT,
    CONSTRAINT FK_assigned_to FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    status ENUM('A faire', 'En cours', 'Fait') DEFAULT 'A faire',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- table de liaison pour les participant au projet
CREATE TABLE IF NOT EXISTS projects_users (
    project_id INT,
    CONSTRAINT FK_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    user_id INT,
    CONSTRAINT FK_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, user_id)
);