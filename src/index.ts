import dotenv from 'dotenv';
import { Command } from 'commander';
import figlet from 'figlet';
import { UserFactory } from './EmployeeFactory';

dotenv.config();

export async function Index() {
  console.log(figlet.textSync('C-Event Manager\n'));

  const program = new Command();

  program
    .name('Exemplo ---> npm node dist/src/index.js')
    .usage('-uu u13o12i3kf49 Joao')
    .description('Programa feito para gerenciar eventos de uma empresa')
    .option('Eventos: ')
    .option('-c, --create <values>', 'Cria um novo evento')
    .option('-r, --read', 'Mostra todas os eventos')
    .option('-u, --update <id> <values>', 'Atualiza os dados de um evento')
    .option('-d, --delete <id>', 'Deleta um evento')
    .option('-s, --search <searchEventValues>', 'Pesquisa por um evento')
    .option('Usuarios (somente administrador): ')
    .option('-cs, --createUser <values>', 'Cria um novo usuario')
    .option('-ru, --readUsers', 'Mostra todas os usuarios')
    .option(
      '-uu, --updateUsers <id> <values>',
      'Atualiza os dados de um usuario',
    )
    .option('-du, --deleteUsers <id>', 'Deleta um usuario')
    .option(
      '-sid, --searchUsersId <searchUserValues>',
      'Pesquisa por um usuario pelo id',
    )
    .option(
      '-sbm, --searchUsersEmail <searchUserValues>',
      'Pesquisa por um usuario pelo email',
    )
    .option(
      '-sbn, --searchUsersName <searchUserValues>',
      'Pesquisa por um usuario pelo nome',
    )
    .option('                                                ')
    .option('Legendas: ', '? --> campo opcional')
    .option(
      'Dados relativos ao cadastro e pesquisa de eventos: ',
      'date, hour, name, hosts, modality, location? plattform?',
    )
    .option(
      'Valores para cadastrar e pesquisar por usuarios (somente administrador): ',
      'name, email',
    )
    .option(
      '-ca, --cadmin <adminUsername> <password>',
      'Cadastra o usuario administrador',
    )
    .option('-adel, --adminDelete <password>', 'Deleta o usuario administrador')
    .option('-elog, --emplog <username> <password>', 'Login de usuarios')
    .option(
      '-alog, --adminlog <adminuser> <adminpassword>',
      'Login de administrador',
    )
    .option('-eout, --elogout <email>', 'Logout para usuarios')
    .option('-out, --logout', 'Logout para o administrador');
  program.parse(process.argv);

  const options = program.opts();
  const uf = new UserFactory();

  if (options.cadmin) {
    const uf = new UserFactory(
      process.env.ADMIN_USER as string,
      process.env.ADMIN_USER as string,
    );
    const classes = await uf.UserCreate();
    return classes;
  }

  if (options.adminlog) {
    const uf = new UserFactory(process.argv[3], process.argv[4]);
    const adminLog = await uf.Login();
    return adminLog;
  }

  if (options.emplog) {
    const uf = new UserFactory(process.argv[3], process.argv[4]);
    const employeeLogin = await uf.Login();
    return employeeLogin;
  }

  if (options.logout) {
    const adminLogout = uf.adminLogout();
    return adminLogout;
  }

  if (options.elogout) {
    const uf = new UserFactory(process.argv[3]);
    const logout = uf.employeeLogout();
    return logout;
  }

  if (options.createUser) {
    const uf = new UserFactory(
      process.argv[3],
      process.argv[4],
      process.argv[5],
    );
    const user = await uf.UserCreate();
    return user;
  }

  if (options.readUsers) {
    const list = await uf.employeesList();
    return list;
  }

  if (options.updateUsers) {
    const data: string[] = [];
    const uf = new UserFactory('', '', '', process.argv[3]);

    data.push(process.argv[4], process.argv[5]);

    await uf.employeeUpdate(data);
  }

  if (options.deleteUsers) {
    await uf.Delete(process.argv[3]);
  }

  if (options.searchUsersId) {
    const EmployeeFinder = uf.Search(process.argv[3]);
    return EmployeeFinder;
  }

  if (options.searchUsersEmail) {
    const EmployeeFinder = uf.Search(process.argv[3]);
    return EmployeeFinder;
  }

  if (options.searchUsersName) {
    const EmployeeFinder = uf.Search(process.argv[3]);
    return EmployeeFinder;
  }
}

// Mais de um funcionário poderá logar por vez. Todos deverão fazer logout depois de terminarem
// suas atividades
// Criar classes com funções comuns entre as classes UserAdmin e Employee?
// Para os eventos --> Verificar se existem funcionários na tabela de login de usuários (mudar o nome dps)
// Se existir, verificar se os mesmos estão na tabela de funcionários
// Enxugar o código
// Tratar erros

Index();
