import { ApiProperty } from '@nestjs/swagger';

export class CharacterProfileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  height: string;

  @ApiProperty()
  mass: string;

  @ApiProperty()
  hairColor: string;

  @ApiProperty()
  skinColor: string;

  @ApiProperty()
  eyeColor: string;

  @ApiProperty()
  birthYear: string;

  @ApiProperty()
  gender: string;

  @ApiProperty({ nullable: true })
  imageUrl: string | null;
}
