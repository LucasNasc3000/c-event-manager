import { Command } from 'commander';
import figlet from 'figlet';

console.log(figlet.textSync('C-Meet Manager\n'));

const program = new Command();

program
  .version('1.0.0')
  .name('Exemplo --> npm run execute')
  .usage('-u u13o12i3kf49 hour 15:30')
  .description('Programa feito para gerenciar eventos de uma empresa')
  .option(
    '-c, --create <date && hour && name && hosts && modality && location? && plattform?>',
    'Cria um novo evento',
  )
  .option('-r, --read', 'Mostra todas os eventos')
  .option('-u, --update <values>', 'Atualiza os dados de um evento')
  .option('-d, --delete <id>', 'Deleta um evento')
  .option('-f, --finished <id>', 'Marca um evento como concluido sem deleta-lo')
  .option(
    '-s, --search <date || hour || name || hosts || modality || location? || plattform?>',
    'Atualiza os dados de uma reuniao',
  )
  .option('------------------------------------------------------')
  .option(
    '-c, --create <name && email && eventCreatorId>',
    'Cria um novo usuario',
  )
  .option('-ru, --readUsers', 'Mostra todas os usuarios')
  .option('-uu, --updateUsers <values>', 'Atualiza os dados de um usuario')
  .option('-du, --deleteUsers <id>', 'Deleta um usuario')
  .option(
    '-su, --search <date || hour || name || hosts || modality || location? || plattform?>',
    'Atualiza os dados de uma reuniao',
  )
  .option(
    '-Legendas: ',
    '&& --> operador "e"\n|| --> operador "ou"\n? --> campo opcional',
  )
  .parse(process.argv);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const options = program.opts();
