# C-Event Manager
Esta é uma aplicação CLI (Command Line Interface) para desktop desenvolvida em TypeScript, criada para gerenciar de eventos. Inicialmente a aplicação foi planejada para gerenciar eventos de uma empresa, de forma geral, por isso o nome "C-Event manager" (Corporative-Event Manager) mas pode ser usado para o registro de quaisquer outros tipos de eventos. Há também um controle de acesso, feito pelo usuário administrador. O administrador (e somente ele) é responsável por cadastrar os funcionários. Já os funcionários são responsáveis por lidar com os eventos.

## Funcionamento
O C-Event Manager atua como um CRUD e também oferece a funcionalidade de pesquisar na base de dados, tanto por eventos quanto por funcionários.<br>
O controle de acesso é feito com o uso de duas tabelas no banco de dados, uma para o funcionário e outra para o administrador. Quando o administrador ou um funcionário realiza o login é feito um registro em uma destas tabelas e o mesmo serve para validar todas as demais operações com eventos e/ou funcionários. Somente um usuário pode realizar o login por vez, seja ele funcionário ou administrador. O logout é feito com a exclusão do registro em uma das duas tabelas no banco de dados mencionadas acima.

## Status
Finalizado ✔️

## Como usar (apenas com o node js)
1. Clone o repositório em um diretório em seu PC --> `git clone https://github.com/LucasNasc3000/c-event-manager`
2. Instale as dependências --> `npm i`
3. Veja todos os comandos disponíveis rodando este comando dentro do diretório raiz do projeto --> `node dist/src/index.js --help`
4. Para ver os dados das entidades --> `node dist/src/index.js --params`

## Tecnologias utilizadas
- TypeScript
- Node js
- Commander js
- Prisma ORM
- Sqlite
- Bcrypt js

# C-Event Manager
This is a CLI (Command Line Interface) desktop application developed in TypeScript, created to manage events. Initially, the application was designed to manage events for a company in general, hence the name "C-Event manager" (Corporate-Event Manager), but it can be used to register any other type of event. There is also access control, performed by the administrator user. The administrator (and only the administrator) is responsible for registering employees. Employees are responsible for handling events.

## How it works
C-Event Manager acts as a CRUD and also offers the functionality to search the database, both for events and employees.<br>
Access control is done using two tables in the database, one for the employee and one for the administrator. When the administrator or an employee logs in, a record is made in one of these tables and this serves to validate all other operations with events and/or employees. Only one regular employee can log in at a time, while the administrator can log in with an employee logged in, but an employee cannot log in while the administrator is logged in. Logging out is done by deleting the record in one of the two tables in the database mentioned above.

## Status
Finalized ✔️

## How to use (only with node js)
1. Clone the repository into a directory on your PC --> `git clone https://github.com/LucasNasc3000/c-event-manager`
2. Install the dependencies --> `npm i`
3. See all available commands by running this command inside the project root directory --> `node dist/src/index.js --help`
4. To see entity data --> `node dist/src/index.js --params`

## Technologies used
- TypeScript
- Node js
- Commander js
- Prisma ORM
- Sqlite
- Bcrypt js
