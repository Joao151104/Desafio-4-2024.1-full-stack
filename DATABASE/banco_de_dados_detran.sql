-- Criação do banco de dados
CREATE DATABASE Detran;

USE Detran;

-- Tabela de Proprietarios (Motoristas)
CREATE TABLE Proprietario (
    CPF CHAR(11) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    vencimento_CNH DATE NOT NULL,
    categoria_CNH CHAR(2) NOT NULL CHECK (
        categoria_CNH IN ('A', 'B', 'AB')
    )
);

-- Tabela de Veículos
CREATE TABLE Veiculo (
    placa CHAR(7) PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano YEAR NOT NULL,
    cor VARCHAR(20) NOT NULL,
    motorista_CPF CHAR(11),
    FOREIGN KEY (motorista_CPF) REFERENCES Proprietario (CPF)
);

-- Tabela de Multas
CREATE TABLE Multa (
    multaID INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL,
    pontos_penalidade INT NOT NULL,
    tipo_infracao VARCHAR(255) NOT NULL,
    veiculo_placa CHAR(7),
    infrator_CPF CHAR(11),
    FOREIGN KEY (veiculo_placa) REFERENCES Veiculo (placa),
    FOREIGN KEY (infrator_CPF) REFERENCES Proprietario (CPF)
);