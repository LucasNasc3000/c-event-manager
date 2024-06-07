"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
console.log(figlet_1.default.textSync('C-Event Manager\n'));
const program = new commander_1.Command();
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
    .option('Dados relativos ao cadastro e pesquisa de eventos: ', 'eventCreator, date, hour, name, hosts, modality, location? plattform?')
    .option('Valores para cadastrar e pesquisar por usuarios (somente administrador): ', 'name, email')
    .option('-ca, --cadmin <password>', 'Cadastra o usuario administrador')
    .option('-adel, --adminDelete <password> <adminDeletePassword>', 'Deleta o usuario administrador')
    .option('-ulog, --userlog <username> <password>', 'Login de usuarios')
    .option('-alog, --adminlog <adminuser> <adminpassword>', 'Login de administrador')
    .option('-ext, --exit', 'logout tanto para usuarios quanto para o administrador')
    .parse(process.argv);
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const options = program.opts();
