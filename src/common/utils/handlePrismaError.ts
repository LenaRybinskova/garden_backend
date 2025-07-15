import { NotFoundException } from '@nestjs/common';

export const handlePrismaError = (error: any, description: string) => {
  if (error && error.code === 'P2025') {
    throw new NotFoundException("")
  }
  throw error;
}