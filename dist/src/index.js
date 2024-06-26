"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const EmployeeFactory_1 = require("./EmployeeFactory");
dotenv_1.default.config();
async function Index() {
    console.log(figlet_1.default.textSync('C-Event Manager\n'));
    const program = new commander_1.Command();
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
        .option('-uu, --updateUsers <id> <values>', 'Atualiza os dados de um usuario')
        .option('-du, --deleteUsers <id>', 'Deleta um usuario')
        .option('-sid, --searchUsersId <searchUserValues>', 'Pesquisa por um usuario pelo id')
        .option('-sbm, --searchUsersEmail <searchUserValues>', 'Pesquisa por um usuario pelo email')
        .option('-sbn, --searchUsersName <searchUserValues>', 'Pesquisa por um usuario pelo nome')
        .option('                                                ')
        .option('Legendas: ', '? --> campo opcional')
        .option('Dados relativos ao cadastro e pesquisa de eventos: ', 'date, hour, name, hosts, modality, location? plattform?')
        .option('Valores para cadastrar e pesquisar por usuarios (somente administrador): ', 'name, email')
        .option('-ca, --cadmin <adminUsername> <password>', 'Cadastra o usuario administrador')
        .option('-adel, --adminDelete <password> <adminDeletePassword>', 'Deleta o usuario administrador')
        .option('-ulog, --userlog <username> <password>', 'Login de usuarios')
        .option('-alog, --adminlog <adminuser> <adminpassword>', 'Login de administrador')
        .option('-ext, --exit', 'logout tanto para usuarios quanto para o administrador');
    program.parse(process.argv);
    const options = program.opts();
    const uf = new EmployeeFactory_1.UserFactory();
    if (options.cadmin) {
        const uf = new EmployeeFactory_1.UserFactory(process.env.ADMIN_USER, process.env.ADMIN_USER);
        const classes = await uf.UserCreate();
        return classes;
    }
    if (options.adminlog) {
        const uf = new EmployeeFactory_1.UserFactory(process.argv[3], process.argv[4]);
        const adminLog = await uf.Login();
        return adminLog;
    }
    if (options.exit) {
        const logout = uf.Logout();
        return logout;
    }
    if (options.createUser) {
        const uf = new EmployeeFactory_1.UserFactory(process.argv[3], process.argv[4], process.argv[5]);
        const user = await uf.UserCreate();
        return user;
    }
    if (options.readUsers) {
        const list = await uf.employeesList();
        return list;
    }
    if (options.updateUsers) {
        const data = [];
        const uf = new EmployeeFactory_1.UserFactory('', '', '', process.argv[3]);
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
exports.Index = Index;
Index();
