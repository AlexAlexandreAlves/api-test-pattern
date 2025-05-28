CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INTEGER,
    city VARCHAR(100)
);

INSERT INTO users (name, age, city) VALUES
('Ana Souza', 28, 'São Paulo'),
('Carlos Mendes', 35, 'Rio de Janeiro'),
('Mariana Lima', 22, 'Belo Horizonte');
