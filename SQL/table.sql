CREATE TABLE Projects (
    project_id VARCHAR(50),
    project_name VARCHAR(50) NOT NULL,
    description VARCHAR(50),
    start_date DATE NOT NULL,
    end_date DATE,
    status INTEGER,
    project_id_1 VARCHAR(50) NOT NULL,
    PRIMARY KEY (project_id),
    FOREIGN KEY (project_id_1) REFERENCES Projects(project_id)
);

CREATE TABLE Categories (
    categorie_id VARCHAR(50),
    name VARCHAR(50),
    type VARCHAR(50),
    description VARCHAR(255),
    PRIMARY KEY (categorie_id)
);

CREATE TABLE Users (
    user_id VARCHAR(50),
    username VARCHAR(50),
    type INTEGER,
    PRIMARY KEY (user_id)
);

CREATE TABLE Receipts (
    receipt_id VARCHAR(50),
    entry_date TIMESTAMP,
    total MONEY,
    description VARCHAR(50),
    user_id VARCHAR(50) NOT NULL,
    categorie_id VARCHAR(50) NOT NULL,
    project_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (receipt_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (categorie_id) REFERENCES Categories(categorie_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);

CREATE TABLE Receipt_Line (
    line_id VARCHAR(50),
    input VARCHAR(50),
    qte INTEGER,
    subtotal MONEY,
    receipt_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (line_id),
    FOREIGN KEY (receipt_id) REFERENCES Receipts(receipt_id)
);

CREATE TABLE Projects_Users (
    project_id VARCHAR(50),
    user_id VARCHAR(50),
    access INTEGER,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);