import { prisma } from '../../lib/prisma';

export class Event {
  constructor(
    private eventCreator: string,
    private date: string,
    private hour: string,
    private name: string,
    private hosts: string,
    private modality: string,
    private location: string,
    private plattform: string,
  ) {}

  Create() {}
}
