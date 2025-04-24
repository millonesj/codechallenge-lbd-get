import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { SwapiService } from '../infraestructure/external-services/swapi/swapi.service';
import { UnsplashService } from '../infraestructure/external-services/unsplash/unsplash.service';
import { CharacterService } from './character.service';
import { Logger } from '@nestjs/common';

describe('AppService', () => {
  let appService: AppService;
  let swapiService: SwapiService;
  let unsplashService: UnsplashService;
  let characterService: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: SwapiService,
          useValue: {
            getCharacter: jest.fn(),
          },
        },
        {
          provide: UnsplashService,
          useValue: {
            getImage: jest.fn(),
          },
        },
        {
          provide: CharacterService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    swapiService = module.get<SwapiService>(SwapiService);
    unsplashService = module.get<UnsplashService>(UnsplashService);
    characterService = module.get<CharacterService>(CharacterService);
  });

  it('should return merged character profile with image', async () => {
    const mockCharacter = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    const mockImage = {
      results: [
        {
          urls: {
            regular: 'https://unsplash.com/luke.jpg',
          },
        },
      ],
    };

    (swapiService.getCharacter as jest.Mock).mockResolvedValue(mockCharacter);
    (unsplashService.getImage as jest.Mock).mockResolvedValue(mockImage);

    const result = await appService.getMerged(1);

    expect(swapiService.getCharacter).toHaveBeenCalledWith(1);
    expect(unsplashService.getImage).toHaveBeenCalledWith('Luke Skywalker');
    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        name: expect.any(String),
        height: expect.any(String),
        mass: expect.any(String),
        hairColor: expect.any(String),
        skinColor: expect.any(String),
        eyeColor: expect.any(String),
        birthYear: expect.any(String),
        gender: expect.any(String),
        imageUrl: expect.any(String),
      }),
    );
  });

  it('should return null imageUrl if no image found', async () => {
    const mockCharacter = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    const mockImage = {
      results: [],
    };

    (swapiService.getCharacter as jest.Mock).mockResolvedValue(mockCharacter);
    (unsplashService.getImage as jest.Mock).mockResolvedValue(mockImage);

    const result = await appService.getMerged(2);

    expect(result.imageUrl).toBeNull();
  });
});