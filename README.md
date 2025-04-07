
# 💸 Banck API

## Passos para rodar o projeto

1. Suba os containers:
```bash
docker compose up
```

2. Rode as migrations:
```bash
npm run migration:run
```

3. Inicie a aplicação:
```bash
npm run start:dev
```

---

## Endpoints disponíveis

### Autenticação

#### Registrar usuário
> POST - http://localhost:3000/v1/auth/register

##### Body:
```json
{
  "email": "usuario1@mail.com",
  "name": "Usuario 1",
  "password": "AAAAAAfd2312,"
}
```

##### Response:
```json
{
  "accessToken": "accessToken",
  "refreshToken": "token"
}
```

> Obs:  
- O `accessToken` tem duração de 15 minutos.  
- O `refreshToken` tem duração de 1 dia ou até o próximo login.

---

## Carteira

#### Consultar minha carteira
> GET - http://localhost:3000/v1/wallet/my

##### Response:
```json
{
  "id": "5144cea0-89a6-4b53-bf85-1eeee0c69ce3",
  "userId": "0f23dd10-a640-4dd5-9e4b-8959fe4bee4e",
  "balance": "0.20",
  "updatedAt": "2025-04-07T15:30:37.941Z"
}
```

#### Ver saldo da carteira
> GET - http://localhost:3000/v1/wallet/balance

##### Response:
```json
{
  "balance": "0.21"
}
```

---

## Transferências

#### Realizar transferência
> POST - http://localhost:3000/v1/wallet/transfer

##### Body:
```json
{
  "senderId": "0f23dd10-a640-4dd5-9e4b-8959fe4bee4e",
  "receiverId": "d89c0319-c3d0-4108-819b-150585e0f4c1",
  "amount": 0.01
}
```

##### Response:
```json
{
  "id": "b0577e22-9702-4a51-952c-17289cbb440e",
  "senderWalletId": "5144cea0-89a6-4b53-bf85-1eeee0c69ce3",
  "receiverWalletId": "f229b928-860e-42a8-91d3-62efda339f1d",
  "amount": 0.01,
  "status": "completed",
  "createdAt": "2025-04-07T12:29:21.365Z"
}
```

---

#### Reverter transferência
> POST - http://localhost:3000/v1/transaction/revert/:id

##### Response:
```json
{
  "id": "b0577e22-9702-4a51-952c-17289cbb440e",
  "senderWalletId": "5144cea0-89a6-4b53-bf85-1eeee0c69ce3",
  "receiverWalletId": "f229b928-860e-42a8-91d3-62efda339f1d",
  "amount": "0.01",
  "status": "reverted",
  "createdAt": "2025-04-07T12:29:21.365Z"
}
```

---

## Observações finais
- Projeto desenvolvido com controle de autenticação via `accessToken` e `refreshToken`.
- As transações podem ser revertidas enquanto estiverem no status `completed`.
- Todos os endpoints estão em `/v1/` seguindo versionamento de API.
