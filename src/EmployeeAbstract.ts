import { prisma } from '../lib/prisma';

export abstract class Employee {
  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
  ) {}

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  set name(name: string) {
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  async Create() {
    const createEmployee = await prisma.employee.create({
      data: {
        name: this._name,
        email: this._email,
        password: this._password,
      },
    });

    console.log(
      `Funcionario criado: ${(createEmployee.name, createEmployee.email)}`,
    );
  }

  async EmployeeList() {
    const employeesList = await prisma.employee.findMany();

    return console.table(employeesList);
  }

  async Update(id: string) {
    const findEmployee = await prisma.employee.findUnique({
      where: {
        id: id,
      },
    });

    if (!findEmployee) {
      return console.log(`Funcionario ${id} nao encontrado`);
    }

    const udpateEmployee = await prisma.employee.update({
      where: {
        id: id,
      },

      data: {
        email: this._email,
        name: this._name,
      },
    });

    return console.table(
      `Dados do funcionario ${id} atualizados: \n${udpateEmployee}`,
    );
  }

  async Delete(id: string) {
    const deleteEmployee = await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    return console.log(`Funcionario ${deleteEmployee.id} deletado`);
  }
}

export class UserAdmin extends Employee {}
