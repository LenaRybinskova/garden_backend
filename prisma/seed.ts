import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Начинаем заполнение БД...');

  // 1. Users
  const userLena = await prisma.user.create({
    data: {
      login: 'Lena Rybinskova',
      email: 'lenakhj@mail.com',
      password: 'qwerty123456',
      role: 'USER',
    },
  });

  const userSasha = await prisma.user.create({
    data: {
      login: 'Sasha Rybinskova',
      email: 'sashahj@mail.com',
      password: 'qwerty123456',
      role: 'USER',
    },
  });

  // 2. Season
  const seasonLena = await prisma.season.createMany({
    data: [
      {
        name: '2024',
        description:
          'Лена: зима 2024 бесснежная, не холодная. но тянулась до мая с заморозками.',
        test: '',
        userId: userLena.id,
      },
      {
        name: '2025',
        description: 'Лена: 2025',
        test: '',
        userId: userLena.id,
      },
    ],
    skipDuplicates: true, // если случайно укажу  в createMany запись которая уже есть в БД, то без  skipDuplicates:true  скрипт упадет
  });

  const seasonSasha = await prisma.season.create({
    data: {
      name: '2024',
      description: 'Саша: .',
      test: '',
      userId: userSasha.id,
    },
  });


  console.log('БД успешно заполнена!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
