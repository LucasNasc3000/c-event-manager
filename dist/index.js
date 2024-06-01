"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
console.log(figlet_1.default.textSync('C-Meet Manager\n'));
const program = new commander_1.Command();
program
    .version('1.0.0')
    .name('Exemplo: npm run execute')
    .usage('-u u13o12i3kf49 hour 15:30')
    .description('Programa feito para gerenciar eventos de uma empresa')
    .option('-c, --create <date && type && subject && ?members && date && hour>', 'Cria um novo evento')
    .option('-r, --read', 'Mostra todas os eventos')
    .option('-u, --update <values>', 'Atualiza os dados de um evento')
    .option('-d, --delete <id>', 'Deleta um evento')
    .option('-f, --finished <id>', 'Marca um evento como concluido sem deleta-lo')
    .option('-s, --search <id || date || hour || type || subject || members>', 'Atualiza os dados de uma reuniao')
    .option('-Legendas: ', '&& --> operador "e"\n|| --> operador "ou"\n? --> campo opcional')
    .parse(process.argv);
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const options = program.opts();
