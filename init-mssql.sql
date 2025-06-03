CREATE DATABASE testdb;
GO

USE testdb;
GO

CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100),
    age INT,
    city NVARCHAR(100)
);
GO

INSERT INTO users (name, age, city) VALUES
('Ana Paula', 28, 'São Paulo'),
('Carlos Mendes', 35, 'Rio de Janeiro'),
('Mariana Lima', 22, 'Belo Horizonte');
GO
