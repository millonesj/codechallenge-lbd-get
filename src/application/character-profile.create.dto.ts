import { IsString, IsUrl } from 'class-validator';

export class CharacterProfilCreateDto {
  @IsString()
  name: string;

  @IsString()
  height: string;

  @IsString()
  mass: string;

  @IsString()
  hairColor: string;

  @IsString()
  skinColor: string;

  @IsString()
  eyeColor: string;

  @IsString()
  birthYear: string;

  @IsString()
  gender: string;

  @IsUrl()
  imageUrl: string;
}
