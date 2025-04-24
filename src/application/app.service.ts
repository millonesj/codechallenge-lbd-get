import { Injectable, Logger } from '@nestjs/common';
import { SwapiService } from 'src/infraestructure/external-services/swapi/swapi.service';
import { UnsplashService } from 'src/infraestructure/external-services/unsplash/unsplash.service';
import { CharacterProfile } from './chracter-profile.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly unsplashService: UnsplashService,
    private readonly logger: Logger,
  ) {}

  async getMerged(id: number): Promise<CharacterProfile> {
    const character = await this.swapiService.getCharacter(id);
    const image = await this.unsplashService.getImage(character.name);
    const imageUrl = image.results?.[0]?.urls?.regular ?? null;
    const fullCharacter = {
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

    this.logger.log('AppService', JSON.stringify(fullCharacter));

    return fullCharacter;
  }
}
