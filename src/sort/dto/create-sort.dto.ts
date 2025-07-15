import { IsOptional, IsString } from 'class-validator';

// отдельно Сорт не создается, только когда создаю Плант, сразу создается и Сорт
export class CreateSortDTO {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  userDescription?: string;

  @IsString()
  @IsOptional()
  producerDescription?: string;

  @IsString()
  @IsOptional()
  photoPackageBase64?: string;
}
