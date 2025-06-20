import { IsString } from 'class-validator';

export class CreateSortDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
