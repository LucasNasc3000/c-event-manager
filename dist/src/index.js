"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
/* eslint-disable no-case-declarations */
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const Decisions_1 = require("./Decisions");
async function Index() {
    console.log(figlet_1.default.textSync('C-Event Manager\n'));
    const program = new commander_1.Command();
    program
        .name('Exemplo ---> npx node dist/src/index.js')
        .usage('-uu u13o12i3kf49 Joao')
        .description('Programa feito para gerenciar eventos')
        .option('Eventos: ')
        .option('-ce, --createEvent <values>', 'Cria um novo evento')
        .option('-re, --readEvent', 'Mostra todas os eventos')
        .option('-ue, --updateEvent <id> <values>', 'Atualiza os dados de um evento')
        .option('-de, --deleteEvent <id>', 'Deleta um evento')
        .option('-se, --searchEvent  <searchEventParam> <searchEventValues>', 'Pesquisa por um evento')
        .option('Usuarios (somente administrador): ')
        .option('-cs, --createUser <values>', 'Cria um novo usuario')
        .option('-ru, --readUsers', 'Mostra todos os usuarios')
        .option('-uu, --updateUsers <id> <values>', 'Atualiza os dados do usuario')
        .option('-du, --deleteUsers <id>', 'Deleta um usuario')
        .option('-su, --searchUser <searchUserParam> <searchUserValue>', 'Pesquisa um usuario')
        .option('-list, --logsList', 'Lista todos os registro de login')
        .option('-outs, --logoutsList', 'Lista todos os registro de logout')
        .option('-lgs, --logsSearch <logSearchParam> <logSearchValue>', 'Pesquisa um log')
        .option('-lgos, --logoutsSearch <logoutSearchParam> <logoutSearchValue>', 'Pesquisa um logout')
        .option('                                                ')
        .option('Legendas: ', '? --> campo opcional')
        .option('Dados relativos ao cadastro e pesquisa de eventos: ', 'date, hour, name, hosts, modality, location? plattform?')
        .option('Valores para cadastrar e pesquisar por usuarios (somente administrador): ', 'name, email')
        .option('-ca, --cadmin <adminUsername> <password>', 'Cadastra o administrador')
        .option('-elog, --emplog <username> <password>', 'Login de usuarios')
        .option('-alog, --adminlog <adminuser> <adminpassword>', 'Login de administrador')
        .option('-eout, --elogout <email>', 'Logout para usuarios')
        .option('-out, --logout', 'Logout do administrador');
    program.parse(process.argv);
    const options = program.opts();
    (0, Decisions_1.Decisions)(options);
}
exports.Index = Index;
// mudar o nome da pasta
Index();
