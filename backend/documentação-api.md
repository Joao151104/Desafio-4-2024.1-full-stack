- `POST /api/motorista/`

  - Entrada: Dados do motorista
    ```json
    {
      "cpf": "00000000000",
      "nome": "Fulano",
      "vencimento_cnh": "2025-12-15",
      "categoria_cnh": "A"
    }
    ```
  - Saída: (nenhuma)

- `POST /api/carro/`

  - Entrada: Dados do carro
    ```json
    {
      "placa": "ABC-1AVD",
      "marca": "Ford",
      "modelo": "Focus",
      "ano": 2015,
      "cor": "Azul",
      "cpf_motorista": "00000000000"
    }
    ```
  - Saída: (nenhuma)

- `POST /api/multa/`

  - Entrada: Dados da multa
    ```json
    {
      "valor": 293.47,
      "data": "2020-01-01",
      "pontos": 4,
      "tipo": "Velocidade acima da máxima permitida",
      "placa_carro": "ABC-1AVD"
    }
    ```
  - Saída: (nenhuma)

- `GET /api/motorista/ `

  - Entrada: (nenhuma)
  - Saída: Lista de motoristas

    ```json
    [
      {
        "cpf": "00000000000",
        "nome": "Fulano",
        "vencimento_cnh": "2025-12-15",
        "categoria_cnh": "A"
      },
      {
        "cpf": "11111111111",
        "nome": "Conceição",
        "vencimento_cnh": "2023-11-14",
        "categoria_cnh": "B"
      },
      {
        "cpf": "22222222222",
        "nome": "Joãozinho",
        "vencimento_cnh": "2027-07-16",
        "categoria_cnh": "AB"
      }
    ]
    ```

- `GET /api/carro/<cpf_motorista>`

  - Entrada: CPF do motorista
  - Saída: Lista de carros do motorista

    ```json
    [
      {
        "placa": "ABC-1AVD",
        "marca": "Ford",
        "modelo": "Focus",
        "ano": 2015,
        "cor": "Azul"
      },
      {
        "placa": "ASD-6D84",
        "marca": "Chevrolet",
        "modelo": "Prisma",
        "ano": 2018,
        "cor": "Prata"
      },
      {
        "placa": "HFD-7A89",
        "marca": "Honda",
        "modelo": "Fit",
        "ano": 2012,
        "cor": "Vermelho"
      }
    ]
    ```

- `GET /api/multa/<cpf_motorista>`

  - Entrada: CPF do motorista
  - Saída: Lista de multas do motorista

    ```json
    [
      {
        "valor": 293.47,
        "data": "2020-01-01",
        "pontos": 4,
        "tipo": "Velocidade acima da máxima permitida"
      },
      {
        "valor": 293.47,
        "data": "2020-01-01",
        "pontos": 4,
        "tipo": "Velocidade acima da máxima permitida"
      },
      {
        "valor": 723.23,
        "data": "2020-01-01",
        "pontos": 7,
        "tipo": "Dirigir utilizando o celular"
      },
      {
        "valor": 1467.35,
        "data": "2020-01-01",
        "pontos": 12,
        "tipo": "Dirigir sob efeito de álcool"
      }
    ]
    ```

- `GET /api/multa/retidos`

  - Entrada: (nenhuma)
  - Saída: Lista de motoristas com 10 pontos ou mais

    ```json
    [
      {
        "nome": "Fulano",
        "pontos": 12
      },
      {
        "nome": "Conceição",
        "pontos": 11
      }
    ]
    ```
