/* eslint-disable no-case-declarations */
import dotenv from 'dotenv';
import { Command } from 'commander';
import figlet from 'figlet';
import { Decisions } from './Decisions';

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

  Decisions(options);
}

// funções que instanciam a uf com argumentos prévios e chamar essas funções no switch
// Criar classes com funções comuns entre as classes UserAdmin e Employee?
// Para os eventos --> Verificar se existem funcionários na tabela de login de usuários (mudar o nome dps)
// Se existir, verificar se os mesmos estão na tabela de funcionários
// Enxugar o código
// Tratar erros

Index();
