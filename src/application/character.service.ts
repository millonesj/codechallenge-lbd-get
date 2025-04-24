import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterProfileHistory } from 'src/domain/character-profile-history.entity';
import { Repository } from 'typeorm';
import { CharacterProfilCreateDto } from './character-profile.create.dto';
import { BaseService } from 'src/infraestructure/common/base.service';

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
}
