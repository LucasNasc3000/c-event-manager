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
    .name('Exemplo ---> npx node dist/src/index.js')
    .usage('-uu u13o12i3kf49 Joao')
    .description('Programa feito para gerenciar eventos de uma empresa')
    .option('Eventos: ')
    .option('-ce, --create <values>', 'Cria um novo evento')
    .option('-re, --read', 'Mostra todas os eventos')
    .option('-ue, --update <id> <values>', 'Atualiza os dados de um evento')
    .option('-de, --delete <id>', 'Deleta um evento')
    .option('-se, --search <searchEventValues>', 'Pesquisa por um evento')
    .option('Usuarios (somente administrador): ')
    .option('-cs, --createUser <values>', 'Cria um novo usuario')
    .option('-ru, --readUsers', 'Mostra todos os usuarios')
    .option('-uu, --updateUsers <id> <values>', 'Atualiza os dados do usuario')
    .option('-du, --deleteUsers <id>', 'Deleta um usuario')
    .option(
      '-sid, --searchUsersId <searchUserValues>',
      'Pesquisa um usuario pelo id',
    )
    .option(
      '-sbm, --searchUsersEmail <searchUserValues>',
      'Pesquisa um usuario pelo email',
    )
    .option(
      '-sbn, --searchUsersName <searchUserValues>',
      'Pesquisa por um usuario pelo nome',
    )
    .option('-list, --logsList', 'Lista todos os registro de login')
    .option('-outs, --logoutsList', 'Lista todos os registro de logout')
    .option('-lms, --logsEmailSearch', 'Pesquisa um log por email')
    .option('-lds, --logsDateSearch', 'Pesquisa um log por data')
    .option('-lhs, --logsHourSearch', 'Pesquisa um log por hora')
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
      'Cadastra o administrador',
    )
    .option('-adel, --adminDelete <password>', 'Deleta o administrador')
    .option('-elog, --emplog <username> <password>', 'Login de usuarios')
    .option(
      '-alog, --adminlog <adminuser> <adminpassword>',
      'Login de administrador',
    )
    .option('-eout, --elogout <email>', 'Logout para usuarios')
    .option('-out, --logout', 'Logout do administrador');
  program.parse(process.argv);

  const options = program.opts();

  Decisions(options);
}

// adicionar startsWith e .length < 1 para findMany
// atributos instanciando as classes (para as classes mais usadas em EmployeeFactory)
// tratamento de erros
// funções que instanciam a uf com argumentos prévios e chamar essas funções no switch
// Para os eventos --> Verificar se existem funcionários na tabela de login de usuários (mudar o nome dps)
// Se existir, verificar se os mesmos estão na tabela de funcionários
// Enxugar o código
// Tratar erros

Index();
