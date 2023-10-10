# Backend

## Setup

### Variáveis de ambiente

1. Faça uma cópia do arquivo [`.env.example`][exemplo-env];
2. Renomeie a cópia para `.env`;
3. Preencha as variáveis contidas na cópia.

#### Exemplo

```bash
# Server
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=27017
DB_USER=root
DB_PASS=root
DB_NAME=elc137t1db
DB_CON_URI=mongodb://localhost:27017
```

## Execução

1. `npm install`
2. `npm start`

## Endpoints

[![Run in Postman](https://run.pstmn.io/button.svg)][postman-link]

<!-- Links -->

[exemplo-env]: <./.env.example> ".env.example"
[postman-link]: <https://app.getpostman.com/run-collection/29631289-5d9e5b02-6926-41c7-9f13-fedc1916c858?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29631289-5d9e5b02-6926-41c7-9f13-fedc1916c858%26entityType%3Dcollection%26workspaceId%3D7319038d-11b5-47bb-a639-9ff301f7d548#?env%5BDevelopment%5D=W3sia2V5IjoiYmFzZVVSTCIsInZhbHVlIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaSIsInNlc3Npb25JbmRleCI6MH1d> "Run in Postman"
