import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../../decorators/skip-auth.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateClubDto } from './dto/create-club.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { SubscribeEventDto } from './dto/subscribe-event.dto';

@Controller('publications')
@ApiTags('Publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @SkipAuth()
  @Get('events/subscribed/:id')
  getSubscribedEvents(@Param('id') id: string) {
    return this.publicationsService.getSubscribedEvents(id);
  }

  @SkipAuth()
  @Post('events/subscribe')
  subscribeEvent(@Body() data: SubscribeEventDto) {
    return this.publicationsService.subscribeEvent(data);
  }

  @SkipAuth()
  @Post('events/unsubscribe')
  unsubscribeEvent(@Body() data: SubscribeEventDto) {
    return this.publicationsService.unsubscribeEvent(data);
  }

  @SkipAuth()
  @Post('events/create')
  createEvent(@Body() data: CreateEventDto) {
    return this.publicationsService.createEvent(data);
  }

  @SkipAuth()
  @Post('clubs/create')
  createClub(@Body() data: CreateClubDto) {
    return this.publicationsService.createClub(data);
  }

  @SkipAuth()
  @Post('programs/create')
  createProgram(@Body() data: CreateProgramDto) {
    return this.publicationsService.createProgram(data);
  }

  @SkipAuth()
  @Get('counts')
  getCounts() {
    return this.publicationsService.getCounts();
  }

  @Get('offers')
  getOffers() {
    return this.publicationsService.getOffers();
  }

  @Get('database')
  getDatabase() {
    return this.publicationsService.getDatabase();
  }

  @Post('delete')
  deletePublication(@Body() body: any) {
    return this.publicationsService.deletePublication(body.id);
  }

  @Post('publish')
  updatePublication(@Body() body: any) {
    const { id, ...data } = body;
    return this.publicationsService.updatePublication(id, data);
  }

  @SkipAuth()
  @Get('events/:id')
  findPublishedEventById(@Param('id') id: string) {
    return this.publicationsService.findPublishedEventById(id);
  }

  @SkipAuth()
  @Get('clubs/:id')
  findPublishedClubById(@Param('id') id: string) {
    return this.publicationsService.findPublishedClubById(id);
  }

  @SkipAuth()
  @Get('programs/:id')
  findPublishedProgramById(@Param('id') id: string) {
    return this.publicationsService.findPublishedProgramById(id);
  }

  @SkipAuth()
  @ApiQuery({ name: 'search', required: false, type: 'string' })
  @ApiQuery({ name: 'city', required: false, type: [String] })
  @ApiQuery({ name: 'startDate', required: false, type: 'string' })
  @ApiQuery({ name: 'endDate', required: false, type: 'string' })
  @Get('events')
  findPublishedEventsByFilters(
    @Query('search') search?: string,
    @Query('city') city?: string[],
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.publicationsService.findPublishedEventsByFilters(
      search,
      city,
      startDate,
      endDate,
    );
  }

  @SkipAuth()
  @ApiQuery({ name: 'search', required: false, type: 'string' })
  @ApiQuery({ name: 'city', required: false, type: [String] })
  @Get('clubs')
  findPublishedClubsByFilters(
    @Query('search') search?: string,
    @Query('city') city?: string,
  ) {
    return this.publicationsService.findPublishedClubsByFilters(search, city);
  }

  @SkipAuth()
  @ApiQuery({ name: 'search', required: false, type: 'string' })
  @ApiQuery({ name: 'city', required: false, type: [String] })
  @Get('programs')
  findPublishedProgramsByFilters(
    @Query('search') search?: string,
    @Query('city') city?: string,
  ) {
    return this.publicationsService.findPublishedProgramsByFilters(
      search,
      city,
    );
  }
}
