import { Command } from 'commander';
import figlet from 'figlet';

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
  .option('-uu, --updateUsers <id> <values>', 'Atualiza os dados de um usuario')
  .option('-du, --deleteUsers <id>', 'Deleta um usuario')
  .option('-su, --searchUsers <searchUserValues>', 'Pesquisa por um usuario')
  .option('                                                ')
  .option('Legendas: ', '? --> campo opcional')
  .option(
    'Dados relativos ao cadastro e pesquisa de eventos: ',
    'eventCreator, date, hour, name, hosts, modality, location? plattform?',
  )
  .option(
    'Valores para cadastrar e pesquisar por usuarios (somente administrador): ',
    'name, email',
  )
  .option('-ca, --cadmin <password>', 'Cadastra o usuario administrador')
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
  )
  .parse(process.argv);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const options = program.opts();
