import { Injectable, Logger } from '@nestjs/common';
import { SwapiService } from 'src/infraestructure/external-services/swapi/swapi.service';
import { UnsplashService } from 'src/infraestructure/external-services/unsplash/unsplash.service';
import { CharacterProfileI } from './chracter-profile.interface';
import { CharacterService } from './character.service';

@Injectable()
export class AppService {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly unsplashService: UnsplashService,
    private readonly logger: Logger,
    private readonly characterService: CharacterService,
  ) {}

  async getMerged(id: number): Promise<CharacterProfileI> {
    const character = await this.swapiService.getCharacter(id);
    const image = await this.unsplashService.getImage(character.name);
    const imageUrl = image.results?.[0]?.urls?.regular ?? null;
    const fullCharacter = {
      id,
      name: character.name,
      height: character.height,
      mass: character.mass,
      hairColor: character.hair_color,
      skinColor: character.skin_color,
      eyeColor: character.eye_color,
      birthYear: character.birth_year,
      gender: character.gender,
      imageUrl,
    };

    await this.characterService.create(fullCharacter);

    this.logger.log('AppService', JSON.stringify(fullCharacter));

    return fullCharacter;
  }
}
