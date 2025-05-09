import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterProfileHistory } from '../domain/character-profile-history.entity';
import { Brackets, Repository } from 'typeorm';
import { CharacterProfilCreateDto } from './character-profile.create.dto';
import { BaseService } from '../infraestructure/common/base.service';
import { OrderByEnum } from '../infraestructure/common/base.pagination.dto';
import { CharacterProfileHistoryPaginationDto } from '../presentation/historial/character-profile-history-pagination.dto';

@Injectable()
export class CharacterService extends BaseService<CharacterProfileHistory> {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(CharacterProfileHistory)
    private readonly characterProfileRepository: Repository<CharacterProfileHistory>,
  ) {
    super(characterProfileRepository);
  }

  async create(characterProfilCreateDto: CharacterProfilCreateDto) {
    const createdRecord = this.characterProfileRepository.create(
      characterProfilCreateDto,
    );
    const { id } = await this.characterProfileRepository.save(createdRecord);

    this.logger.log(`${this.getNamespace()}.create`, {
      created: id,
    });

    return { id };
  }

  async findOne(id: number): Promise<any | boolean> {
    this.logger.log(`${this.getNamespace()}.findOne`, {
      id,
    });

    const existingRecord = await this.characterProfileRepository
      .createQueryBuilder('characterProfile')
      .andWhere('characterProfile.id = :id', {
        id,
      })
      .getOne();

    if (!existingRecord) {
      return false;
    }

    this.logger.log(`${this.getNamespace()}.findOne`, {
      id,
      isFound: true,
    });
    return existingRecord;
  }

  async findAll({ page, limit }: CharacterProfileHistoryPaginationDto) {
    this.logger.log(`${this.getNamespace()}.findAll`, {
      start: true,
    });

    const queryBuilder =
      this.characterProfileRepository.createQueryBuilder('ch');

    const [items, count] = await queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy('ch.createdAt', OrderByEnum.ASC)
      .getManyAndCount();

    this.logger.log(`${this.getNamespace()}.findAll`, {
      found: { pageCount: items.length, total: count },
    });
    return {
      items,
      count,
    };
  }
}
