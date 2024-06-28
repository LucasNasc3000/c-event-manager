import dotenv from 'dotenv';
import { Command } from 'commander';
import figlet from 'figlet';
import { UserFactory } from './EmployeeFactory';

dotenv.config();

export async function Index() {
  console.log(figlet.textSync('C-Event Manager\n'));

  const program = new Command();

  program
    .name('Exemplo ---> npm run execute')
    .usage('-u u13o12i3kf49 hour 15:30')
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
    .option('-su, --searchUsers <searchUserValues>', 'Pesquisa por um usuario')
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
    .option(
      '-adel, --adminDelete <password> <adminDeletePassword>',
      'Deleta o usuario administrador',
    )
    .option('-ulog, --userlog <username> <password>', 'Login de usuarios')
    .option(
      '-alog, --adminlog <adminuser> <adminpassword>',
      'Login de administrador',
    )
    .option(
      '-ext, --exit',
      'logout tanto para usuarios quanto para o administrador',
    );
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

  if (options.exit) {
    const logout = uf.Logout();
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

  if (options.searchUsers) {
    const findById = uf.searchById(process.argv[3]);
    return findById;
  }
}

Index();
