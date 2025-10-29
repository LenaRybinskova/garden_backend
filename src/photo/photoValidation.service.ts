/*
import { BadRequestException, Injectable } from '@nestjs/common';


@Injectable()
export class PhotoValidationService {
  private readonly MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
  private readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  async validatePhoto(photoBase64: string): Promise<string> {
    const mimeTypeExtractPhoto = this.getMimeType(photoBase64); // первоначальный мимТайп для проверок

    const cleanBase64 = this.cleanBase64Prefix(
      photoBase64,
      mimeTypeExtractPhoto,
    ); // получили чистую стркоу

    await this.validateTypeFile(cleanBase64, mimeTypeExtractPhoto); // проверка что это точно формат документа из допустимых

    this.validateSize(cleanBase64); // проверка размера файла

    return cleanBase64;
  }

  private getMimeType(base64String: string): string {
    const match = base64String.match(
      /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/,
    );

    if (!match) {
      throw new BadRequestException('Неверный формат фото');
    }

    return match[1];
  }

  private cleanBase64Prefix(base64String: string, mimeType: string): string {
    const expectedPrefix = `data:${mimeType};base64,`;

    if (base64String.startsWith(expectedPrefix)) {
      return base64String.slice(expectedPrefix.length); //возвращаем чистую строку
    }

    throw new BadRequestException('Неверный формат данных фото');
  }

  private validateSize(cleanBase64: string): void {
    const buffer = Buffer.from(cleanBase64, 'base64');
    const fileSize = buffer.length;

    if (fileSize > this.MAX_FILE_SIZE) {
      throw new BadRequestException('Файл фото слишком большой');
    }
  }

  private async validateTypeFile(
    cleanBase64: string,
    mimeTypeExtractPhoto: string,
  ) {
    const buffer = Buffer.from(cleanBase64, 'base64'); // декодир в бинарн код


    const fileType = require('file-type');
    const fileTypeResult = await fileType(buffer);

    if (!fileTypeResult) {
      throw new BadRequestException('Не удалось определить тип файла');
    }

    if (!fileTypeResult.mime.startsWith('image/')) {
      throw new BadRequestException('Недопустимый формат файла');
    }

    if (!this.ALLOWED_MIME_TYPES.includes(fileTypeResult.mime)) {
      throw new BadRequestException('Недопустимый формат файла');
    }
    console.log('fileType.mime', fileTypeResult.mime);
    console.log('mimeTypeExtractPhoto', mimeTypeExtractPhoto);

    if (fileTypeResult.mime !== mimeTypeExtractPhoto) {
      throw new BadRequestException('Недопустимый формат файла');
    }
  }
}
*/

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class PhotoValidationService {
  private readonly MAX_FILE_SIZE = 3 * 1024 * 1024;
  private readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  async validatePhoto(photoBase64: string): Promise<string> {
    const mimeTypeExtractPhoto = this.getMimeType(photoBase64); // первоначальный мимТайп для проверок

    await this.validateTypeFile(photoBase64, mimeTypeExtractPhoto);
    this.validateSize(photoBase64);

    return photoBase64;
  }

  private getMimeType(base64String: string): string {
    const match = base64String.match(
      /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/,
    );

    if (!match) {
      throw new BadRequestException('Неверный формат фото');
    }

    return match[1];
  }

  private validateSize(base64String: string): void {
    const cleanBase64 = this.extractCleanBase64(base64String);
    const buffer = Buffer.from(cleanBase64, 'base64');
    const fileSize = buffer.length;

    if (fileSize > this.MAX_FILE_SIZE) {
      throw new BadRequestException('Файл фото слишком большой');
    }
  }

  private async validateTypeFile(
    base64String: string,
    mimeTypeExtractPhoto: string,
  ): Promise<void> {
    try {
      const cleanBase64 = this.extractCleanBase64(base64String);
      const buffer = Buffer.from(cleanBase64, 'base64');

      const fileTypeModule = await import('file-type');
      const fileTypeResult = await fileTypeModule.default(buffer);

      if (!fileTypeResult) {
        throw new BadRequestException('Не удалось определить тип файла');
      }

      if (!fileTypeResult.mime.startsWith('image/')) {
        throw new BadRequestException('Недопустимый формат файла');
      }

      if (!this.ALLOWED_MIME_TYPES.includes(fileTypeResult.mime)) {
        throw new BadRequestException('Недопустимый формат файла');
      }

      console.log('fileType.mime', fileTypeResult.mime);
      console.log('mimeTypeExtractPhoto', mimeTypeExtractPhoto);

      if (fileTypeResult.mime !== mimeTypeExtractPhoto) {
        throw new BadRequestException('Недопустимый формат файла');
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.fallbackValidation(base64String, mimeTypeExtractPhoto);
    }
  }

  private fallbackValidation(
    base64String: string,
    mimeTypeExtractPhoto: string,
  ): void {
    const cleanBase64 = this.extractCleanBase64(base64String);
    const buffer = Buffer.from(cleanBase64, 'base64');
    const hex = buffer.subarray(0, 12).toString('hex');

    const formatChecks = {
      'image/jpeg': hex.startsWith('ffd8ff'),
      'image/png': hex.startsWith('89504e470d0a1a0a'),
      'image/gif': hex.startsWith('47494638'),
      'image/webp':
        hex.startsWith('52494646') && hex.substring(16, 24) === '57454250',
    };

    if (!formatChecks[mimeTypeExtractPhoto as keyof typeof formatChecks]) {
      throw new BadRequestException(
        `Файл не соответствует заявленному формату: ${mimeTypeExtractPhoto}`,
      );
    }

    if (!this.ALLOWED_MIME_TYPES.includes(mimeTypeExtractPhoto)) {
      throw new BadRequestException('Недопустимый формат файла');
    }
  }

  private extractCleanBase64(base64String: string): string {
    const match = base64String.match(/^data:[^;]+;base64,(.+)$/);
    if (!match) {
      throw new BadRequestException('Неверный формат base64 строки');
    }
    return match[1];
  }
}
