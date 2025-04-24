import { IsNumber } from 'class-validator';
export class FindOnePeopleDto {
  @IsNumber()
  id: number;
}
