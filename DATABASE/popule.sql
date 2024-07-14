-- Populando a tabela de Proprietarios
INSERT INTO
    Proprietario (
        CPF,
        nome,
        vencimento_CNH,
        categoria_CNH
    )
VALUES (
        '12345678901',
        'João Silva',
        '2025-12-31',
        'AB'
    ),
    (
        '98765432100',
        'Maria Oliveira',
        '2024-11-30',
        'B'
    ),
    (
        '11122233344',
        'Carlos Pereira',
        '2026-10-20',
        'A'
    );

-- Populando a tabela de Veículos
INSERT INTO
    Veiculo (
        placa,
        marca,
        modelo,
        ano,
        cor,
        motorista_CPF
    )
VALUES (
        'ABC1234',
        'Toyota',
        'Corolla',
        2020,
        'Preto',
        '12345678901'
    ),
    (
        'XYZ9876',
        'Honda',
        'Civic',
        2019,
        'Branco',
        '98765432100'
    ),
    (
        'LMN4567',
        'Ford',
        'Fusion',
        2018,
        'Prata',
        '11122233344'
    );

-- Populando a tabela de Multas
INSERT INTO
    Multa (
        valor,
        data,
        pontos_penalidade,
        tipo_infracao,
        veiculo_placa,
        infrator_CPF
    )
VALUES (
        150.00,
        '2023-01-15',
        4,
        'Excesso de velocidade',
        'ABC1234',
        '12345678901'
    ),
    (
        200.00,
        '2023-02-20',
        5,
        'Avanço de sinal',
        'XYZ9876',
        '98765432100'
    ),
    (
        100.00,
        '2023-03-25',
        3,
        'Estacionamento irregular',
        'LMN4567',
        '11122233344'
    ),
    (
        250.00,
        '2023-04-10',
        7,
        'Dirigir alcoolizado',
        'ABC1234',
        '12345678901'
    );