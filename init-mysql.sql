CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  city VARCHAR(100)
);

INSERT INTO users (name, age, city) VALUES
('Ana Paula', 28, 'São Paulo'),
('Carlos Mendes', 35, 'Rio de Janeiro'),
('Mariana Lima', 22, 'Belo Horizonte');
