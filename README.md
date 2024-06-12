# C-Event Manager
Esta é uma aplicação CLI (Command Line Interface) para desktop desenvolvida em TypeScript, criada para gerenciar de eventos. Inicialmente a aplicação foi planejada para gerenciar eventos de uma empresa, de forma geral, por isso o nome "C-Event manager" (Corporative-Event Manager) mas pode ser usado para o registro de quaisquer outros tipos de eventos. Há também um controle de acesso, feito pelo usuário administrador. O administrador (e somente ele) é responsável por cadastrar os funcionários. Já os funcionários são responsáveis por lidar com os eventos.

## Funcionamento
O C-Event Manager atua como um CRUD e também oferece a funcionalidade de pesquisar na base de dados, tanto por eventos quanto por funcionários.<br>
O controle de acesso é feito com o uso de duas tabelas no banco de dados, uma para o funcionário e outra para o administrador. Quando o administrador ou um funcionário realiza o login é feito um registro em uma destas tabelas e o mesmo serve para validar todas as demais operações com eventos e/ou funcionários. Somente um usuário pode realizar o login por vez, seja ele funcionário ou administrador. O logout é feito com a exclusão do registro em uma das duas tabelas no banco de dados mencionadas acima.

## Status
Em desenvolvimento 🛠️

# Tecnologias utilizadas
- TypeScript
- Node js
- Commander js
- Prisma ORM
- Sqlite
