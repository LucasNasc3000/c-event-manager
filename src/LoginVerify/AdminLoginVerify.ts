import { prisma } from '../../lib/prisma';

export class AdminLoginVerify {
  public async Verify() {
    try {
      const admLogin = await prisma.adminLogin.findMany();
      const adminData: string[] = [];

      if (admLogin.length <= 0) return false;

      admLogin.map((adm) => {
        adminData.push(adm.adminUser, adm.adminPassword);
      });

      const adminVerify = await prisma.employee.findUnique({
        where: {
          email: adminData[0],
          password: adminData[1],
        },
      });

      if (!adminVerify) {
        return console.log(
          `Erro ao validar login do administrador ${admLogin[0]}`,
        );
      }

      if (
        adminVerify.email === adminData[0] &&
        adminVerify.password === adminData[1]
      ) {
        return true;
      }
      return false;
    } catch (e) {
      return console.log(e);
    }
  }
}
