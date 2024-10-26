import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Event } from './entities/event.entity';
import { Club } from './entities/club.entity';
import { Program } from './entities/program.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateClubDto } from './dto/create-club.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { SubscribeEventDto } from './dto/subscribe-event.dto';
import { Subscription } from '@prisma/client';

@Injectable()
export class PublicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSubscribedEvents(id: string) {
    return await this.prisma.subscription.findMany({
      where: {
        userId: id,
      },
      select: {
        event: true,
      },
    });
  }

  async subscribeEvent(data: SubscribeEventDto): Promise<Subscription> {
    return await this.prisma.subscription.create({
      data,
    });
  }

  async unsubscribeEvent(data: SubscribeEventDto) {
    return await this.prisma.subscription.deleteMany({
      where: {
        AND: [{ userId: data.userId }, { eventId: data.eventId }],
      },
    });
  }

  async createEvent(data: CreateEventDto): Promise<Event> {
    return await this.prisma.event.create({
      data: data,
    });
  }

  async createClub(data: CreateClubDto): Promise<Club> {
    return await this.prisma.club.create({
      data: data,
    });
  }

  async createProgram(data: CreateProgramDto): Promise<Program> {
    return await this.prisma.program.create({
      data: data,
    });
  }

  async getCounts(): Promise<{
    events: number;
    clubs: number;
    programs: number;
  }> {
    const events = (await this.prisma.event.findMany()).length;
    const programs = (await this.prisma.program.findMany()).length;
    const clubs = (await this.prisma.club.findMany()).length;

    return { events, programs, clubs };
  }

  async getOffers() {
    const events = await this.prisma.event.findMany({
      where: {
        published: false,
      },
    });
    const programs = await this.prisma.program.findMany({
      where: {
        published: false,
      },
    });
    const clubs = await this.prisma.club.findMany({
      where: {
        published: false,
      },
    });
    const publications = [
      ...events.map((event) => ({ ...event, ptype: 'event' })),
      ...programs.map((program) => ({ ...program, ptype: 'program' })),
      ...clubs.map((club) => ({ ...club, ptype: 'club' })),
    ].sort((a: any, b: any) => a.createdAt - b.createdAt);
    return publications;
  }

  async getDatabase() {
    const events = await this.prisma.event.findMany({
      where: {
        published: true,
      },
    });
    const programs = await this.prisma.program.findMany({
      where: {
        published: true,
      },
    });
    const clubs = await this.prisma.club.findMany({
      where: {
        published: true,
      },
    });

    const publications = [
      ...events.map((event) => ({ ...event, ptype: 'event' })),
      ...programs.map((program) => ({ ...program, ptype: 'program' })),
      ...clubs.map((club) => ({ ...club, ptype: 'club' })),
    ].sort((a: any, b: any) => a.createdAt - b.createdAt);

    return publications;
  }

  async deletePublication(id) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });
    if (event) {
      const newEvent = await this.prisma.event.delete({
        where: { id },
      });
      return newEvent;
    }

    const club = await this.prisma.club.findUnique({
      where: {
        id,
      },
    });
    if (club) {
      const newClub = await this.prisma.club.delete({
        where: { id },
      });
      return newClub;
    }

    const program = await this.prisma.program.findUnique({
      where: {
        id,
      },
    });
    if (program) {
      const newProgram = await this.prisma.program.delete({
        where: { id },
      });
      return newProgram;
    }
  }

  async updatePublication(id, data) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });
    if (event) {
      const newEvent = await this.prisma.event.update({
        where: { id },
        data: {
          ...data,
          published: true,
        },
      });
      return newEvent;
    }

    const club = await this.prisma.club.findUnique({
      where: {
        id,
      },
    });
    if (club) {
      const newClub = await this.prisma.club.update({
        where: { id },
        data: {
          ...data,
          published: true,
        },
      });
      return newClub;
    }

    const program = await this.prisma.program.findUnique({
      where: {
        id,
      },
    });
    if (program) {
      const newProgram = await this.prisma.program.update({
        where: { id },
        data: {
          ...data,
          published: true,
        },
      });
      return newProgram;
    }
  }

  async findPublishedEventById(id: string): Promise<Event> {
    return await this.prisma.event.findUnique({
      where: {
        id,
        published: true,
      },
      include: {
        subscriptions: true,
      },
    });
  }

  async findPublishedClubById(id: string): Promise<Club> {
    return await this.prisma.club.findUnique({
      where: {
        id,
        published: true,
      },
    });
  }

  async findPublishedProgramById(id: string): Promise<Program> {
    return await this.prisma.program.findUnique({
      where: {
        id,
        published: true,
      },
    });
  }

  async findPublishedEventsByFilters(
    search: string,
    city: string[],
    startDate: string,
    endDate: string,
  ) {
    let events = await this.prisma.event.findMany({
      where: {
        published: true,
      },
      include: {
        categories: true,
      },
    });

    if (search) {
      events = events.filter(
        (event) =>
          event.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          event.content
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()),
      );
    }

    if (city && city[0]) {
      events = events.filter((event) => city.includes(event.address.city));
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      events = events.filter(
        (event) => !(end < event.startDate || start > event.endDate),
      );
    }

    return events;
  }

  async findPublishedClubsByFilters(search?: string, city?: string) {
    let clubs = await this.prisma.club.findMany({
      where: {
        published: true,
      },
      include: {
        categories: true,
      },
    });

    if (search) {
      clubs = clubs.filter(
        (club) =>
          club.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          club.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
    }

    if (city && city[0]) {
      clubs = clubs.filter((club) => city.includes(club.address.city));
    }

    return clubs;
  }

  async findPublishedProgramsByFilters(search?: string, city?: string) {
    let programs = await this.prisma.program.findMany({
      where: {
        published: true,
      },
      include: {
        categories: true,
      },
    });

    if (search) {
      programs = programs.filter(
        (program) =>
          program.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          program.content
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()),
      );
    }

    if (city && city[0]) {
      programs = programs.filter((program) => city.includes(program.city));
    }

    return programs;
  }
}
