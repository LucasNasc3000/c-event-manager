import { Command } from 'commander';
import figlet from 'figlet';

console.log(figlet.textSync('C-Meet Manager\n'));

const program = new Command();

program
  .version('-v, --version', 'Mostra a versao do C-Meet Manager')
  .name('Exemplo ---> npm run execute')
  .usage('-u u13o12i3kf49 hour 15:30')
  .description('Programa feito para gerenciar eventos de uma empresa')
  .option('Eventos: ')
  .option('-c, --create <values>', 'Cria um novo evento')
  .option('-r, --read', 'Mostra todas os eventos')
  .option('-u, --update <values>', 'Atualiza os dados de um evento')
  .option('-d, --delete <id>', 'Deleta um evento')
  .option('-f, --finished <id>', 'Marca um evento como concluido sem deleta-lo')
  .option(
    '-s, --search <searchEventOptions>',
    'Atualiza os dados de uma reuniao',
  )
  .option('Usuarios: ')
  .option('-cs, --createUser <values> <adminPassword>', 'Cria um novo usuario')
  .option('-ru, --readUsers <adminPassword>', 'Mostra todas os usuarios')
  .option(
    '-uu, --updateUsers <values> <adminPassword>',
    'Atualiza os dados de um usuario',
  )
  .option('-du, --deleteUsers <id> <adminPassword>', 'Deleta um usuario')
  .option(
    '-su, --searchUsers <searchUserOptions> <adminPassword>',
    'Atualiza os dados de uma reuniao',
  )
  .option('                                                ')
  .option('Legendas: ', '? --> campo opcional')
  .option(
    'Dados relativos ao cadastro e pesquisa de eventos: ',
    'eventCreator, date, hour, name, hosts, modality, location? plattform?',
  )
  .option(
    'Valores para cadastrar e pesquisar por usuarios (somente administrador): ',
    'name, email, eventCreatorId',
  )
  .option(
    '-ca, --cadmin <password> <adminDeletePassword>',
    'Cadastra o usuario administrador',
  )
  .option(
    '-adel, --adminDelete <password> <adminDeletePassword>',
    'Cadastra o usuario administrador',
  )
  .parse(process.argv);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const options = program.opts();
