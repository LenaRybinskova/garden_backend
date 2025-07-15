// prisma/seed-weather.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try{
    await prisma.weather.createMany({
      data: [
        {
          dateTime: '2025-04-01',
          PM3: '11.0',
          AM3: '6.1',
          description: '',
        },
        {
          dateTime: '2025-04-02',
          PM3: '11.0',
          AM3: '5.5',
          description: 'Солнечно',
        },
        {
          dateTime: '2025-04-03',
          PM3: '12.0',
          AM3: '5.4',
          description: '',
        },
        {
          dateTime: '2025-04-04',
          PM3: '14.0',
          AM3: '4.8',
          description: '',
        },
        {
          dateTime: '2025-04-05',
          PM3: '5.3',
          AM3: '1.2',
          description: '',
        },
        {
          dateTime: '2025-04-06',
          PM3: '0.0',
          AM3: '-3.6',
          description: '',
        },
        {
          dateTime: '2025-04-07',
          PM3: '0.0',
          AM3: '-3.4',
          description: '',
        },
        {
          dateTime: '2025-04-08',
          PM3: '0.0',
          AM3: '-3.4',
          description: '',
        },
        {
          dateTime: '2025-04-09',
          PM3: '0.0',
          AM3: '-3.7',
          description: '',
        },
        {
          dateTime: '2025-04-09',
          PM3: '1.0',
          AM3: '-4.0',
          description: '',
        },
        {
          dateTime: '2025-04-10',
          PM3: '3.2',
          AM3: '-3.8',
          description: '',
        },
        {
          dateTime: '2025-04-11',
          PM3: '3.2',
          AM3: '-3.8',
          description: '',
        },
        {
          dateTime: '2025-04-12',
          PM3: '3.2',
          AM3: '-0.1',
          description: '',
        },
        {
          dateTime: '2025-04-13',
          PM3: '7.6',
          AM3: '-0.1',
          description: '',
        },
        {
          dateTime: '2025-04-14',
          PM3: '10.6',
          AM3: '-0.1',
          description: '',
        },
        {
          dateTime: '2025-04-15',
          PM3: '16.6',
          AM3: '6.1',
          description: '',
        },
        {
          dateTime: '2025-04-16',
          PM3: '18.6',
          AM3: '8.1',
          description: '',
        },
        {
          dateTime: '2025-04-17',
          PM3: '16.6',
          AM3: '9.6',
          description: '',
        },
        {
          dateTime: '2025-04-18',
          PM3: '21.6',
          AM3: '10.6',
          description: '',
        },
        {
          dateTime: '2025-04-19',
          PM3: '23.6',
          AM3: '13.6',
          description: '',
        },
        {
          dateTime: '2025-04-20',
          PM3: '23.6',
          AM3: '13.6',
          description: '',
        },

        {
          dateTime: '2025-04-21',
          PM3: '24.6',
          AM3: '12.6',
          description: '',
        },
        {
          dateTime: '2025-04-22',
          PM3: '22.6',
          AM3: '13.6',
          description: '',
        },
        {
          dateTime: '2025-04-23',
          PM3: '25.0',
          AM3: '12.0',
          description: '',
        },
        {
          dateTime: '2025-04-24',
          PM3: '18.0',
          AM3: '10.0',
          description: '',
        },
        {
          dateTime: '2025-04-25',
          PM3: '16.0',
          AM3: '7.0',
          description: '',
        },
        {
          dateTime: '2025-04-26',
          PM3: '9.0',
          AM3: '2.0',
          description: '',
        },
        {
          dateTime: '2025-04-27',
          PM3: '6.0',
          AM3: '0.0',
          description: '',
        },
        {
          dateTime: '2025-04-28',
          PM3: '10.0',
          AM3: '0.0',
          description: '',
        },
        {
          dateTime: '2025-04-29',
          PM3: '8.0',
          AM3: '5.0',
          description: '',
        },
        {
          dateTime: '2025-04-30',
          PM3: '6.0',
          AM3: '2.0',
          description: '',
        },
        {
          dateTime: '2025-05-01',
          PM3: '6.0',
          AM3: '2.0',
          description: '',
        },
        {
          dateTime: '2025-05-02',
          PM3: '6.0',
          AM3: '2.0',
          description: '',
        },
        {
          dateTime: '2025-05-03',
          PM3: '12.0',
          AM3: '1.0',
          description: '',
        },
        {
          dateTime: '2025-05-04',
          PM3: '16.0',
          AM3: '5.0',
          description: '',
        },
        {
          dateTime: '2025-05-05',
          PM3: '15.0',
          AM3: '5.0',
          description: '',
        },
        {
          dateTime: '2025-05-06',
          PM3: '12.0',
          AM3: '2.0',
          description: '',
        },
        {
          dateTime: '2025-05-07',
          PM3: '12.0',
          AM3: '5.0',
          description: '',
        },
        {
          dateTime: '2025-05-08',
          PM3: '10.0',
          AM3: '4.0',
          description: '',
        },
        {
          dateTime: '2025-05-09',
          PM3: '10.0',
          AM3: '3.0',
          description: '',
        },
        {
          dateTime: '2025-05-10',
          PM3: '8.0',
          AM3: '2.0',
          description: '',
        },
        {
          dateTime: '2025-05-11',
          PM3: '8.0',
          AM3: '2.0',
          description: '',
        },
        {
          dateTime: '2025-05-12',
          PM3: '7.0',
          AM3: '3.0',
          description: '',
        },
        {
          dateTime: '2025-05-13',
          PM3: '7.0',
          AM3: '4.0',
          description: '',
        },
        {
          dateTime: '2025-05-14',
          PM3: '12.0',
          AM3: '4.0',
          description: '',
        },
        {
          dateTime: '2025-05-15',
          PM3: '16.0',
          AM3: '6.0',
          description: '',
        },
        {
          dateTime: '2025-05-16',
          PM3: '20.0',
          AM3: '9.0',
          description: '',
        },
        {
          dateTime: '2025-05-17',
          PM3: '19.0',
          AM3: '9.0',
          description: '',
        },
        {
          dateTime: '2025-05-18',
          PM3: '20.0',
          AM3: '11.0',
          description: '',
        },
        {
          dateTime: '2025-05-19',
          PM3: '15.0',
          AM3: '10.0',
          description: '',
        },
        {
          dateTime: '2025-05-20',
          PM3: '16.0',
          AM3: '8.0',
          description: '',
        },
        {
          dateTime: '2025-05-21',
          PM3: '18.0',
          AM3: '9.0',
          description: '',
        },
        {
          dateTime: '2025-05-22',
          PM3: '20.0',
          AM3: '10.0',
          description: '',
        },
        {
          dateTime: '2025-05-23',
          PM3: '24.0',
          AM3: '13.0',
          description: '',
        },
        {
          dateTime: '2025-05-24',
          PM3: '25.0',
          AM3: '15.0',
          description: '',
        },
        {
          dateTime: '2025-05-25',
          PM3: '25.0',
          AM3: '14.0',
          description: '',
        },
        {
          dateTime: '2025-05-26',
          PM3: '25.0',
          AM3: '15.0',
          description: '',
        },
        {
          dateTime: '2025-05-27',
          PM3: '24.0',
          AM3: '15.0',
          description: '',
        },
        {
          dateTime: '2025-05-28',
          PM3: '25.0',
          AM3: '15.0',
          description: '',
        },
        {
          dateTime: '2025-05-29',
          PM3: '26.0',
          AM3: '15.0',
          description: '',
        },
        {
          dateTime: '2025-05-30',
          PM3: '24.0',
          AM3: '15.0',
          description: '',
        },
        {
          dateTime: '2025-05-31',
          PM3: '24.0',
          AM3: '15.0',
          description: '',
        },
        {
          dateTime: '2025-06-01',
          PM3: '21.0',
          AM3: '13.0',
          description: '',
        },
        {
          dateTime: '2025-06-02',
          PM3: '22.0',
          AM3: '10.0',
          description: '',
        },
        {
          dateTime: '2025-06-03',
          PM3: '21.0',
          AM3: '15.0',
          description: '',
        },
        {
          dateTime: '2025-06-04',
          PM3: '25.0',
          AM3: '12.0',
          description: '',
        },
        {
          dateTime: '2025-06-05',
          PM3: '25.0',
          AM3: '12.0',
          description: '',
        },
        {
          dateTime: '2025-06-06',
          PM3: '22.0',
          AM3: '16.0',
          description: '',
        },
        {
          dateTime: '2025-06-07',
          PM3: '27.0',
          AM3: '16.0',
          description: '',
        },
        {
          dateTime: '2025-06-08',
          PM3: '27.0',
          AM3: '17.0',
          description: '',
        },
        {
          dateTime: '2025-06-09',
          PM3: '27.0',
          AM3: '15.0',
          description: '',
        },
        {
          dateTime: '2025-06-10',
          PM3: '20.0',
          AM3: '13.0',
          description: '',
        },
        {
          dateTime: '2025-06-11',
          PM3: '21.0',
          AM3: '11.0',
          description: '',
        },
        {
          dateTime: '2025-06-12',
          PM3: '22.0',
          AM3: '14.0',
          description: '',
        },
        {
          dateTime: '2025-06-13',
          PM3: '18.0',
          AM3: '13.0',
          description: '',
        },
        {
          dateTime: '2025-06-14',
          PM3: '14.0',
          AM3: '11.0',
          description: '',
        },
        {
          dateTime: '2025-06-15',
          PM3: '19.0',
          AM3: '12.0',
          description: '',
        },
        {
          dateTime: '2025-06-16',
          PM3: '24.0',
          AM3: '11.0',
          description: '',
        },
        {
          dateTime: '2025-06-17',
          PM3: '24.0',
          AM3: '14.0',
          description: '',
        },
        {
          dateTime: '2025-06-18',
          PM3: '20.0',
          AM3: '15.0',
          description: '',
        },
        {
          dateTime: '2025-06-19',
          PM3: '14.0',
          AM3: '11.0',
          description: '',
        },
        {
          dateTime: '2025-06-20',
          PM3: '17.0',
          AM3: '9.0',
          description: '',
        },
        {
          dateTime: '2025-06-21',
          PM3: '18.0',
          AM3: '12.0',
          description: '',
        },
        {
          dateTime: '2025-06-22',
          PM3: '16.0',
          AM3: '11.0',
          description: '',
        },
        {
          dateTime: '2025-06-23',
          PM3: '19.0',
          AM3: '11.0',
          description: '',
        },
        {
          dateTime: '2025-06-24',
          PM3: '20.0',
          AM3: '10.0',
          description: '',
        },
        {
          dateTime: '2025-06-25',
          PM3: '19.0',
          AM3: '11.0',
          description: '',
        },
        {
          dateTime: '2025-06-26',
          PM3: '17.0',
          AM3: '12.0',
          description: '',
        },
        {
          dateTime: '2025-06-27',
          PM3: '19.0',
          AM3: '10.0',
          description: '',
        },
        {
          dateTime: '2025-06-28',
          PM3: '20.0',
          AM3: '13.0',
          description: '',
        },
        {
          dateTime: '2025-06-29',
          PM3: '21.0',
          AM3: '12.0',
          description: '',
        },
        {
          dateTime: '2025-06-30',
          PM3: '13.0',
          AM3: '10.0',
          description: '',
        },
        {
          dateTime: '2025-07-01',
          PM3: '13.0',
          AM3: '10.0',
          description: '',
        },
        {
          dateTime: '2025-07-02',
          PM3: '20.0',
          AM3: '11.0',
          description: '',
        },
        {
          dateTime: '2025-07-03',
          PM3: '25.0',
          AM3: '12.0',
          description: '',
        },
        {
          dateTime: '2025-07-04',
          PM3: '27.0',
          AM3: '16.0',
          description: '',
        },
        {
          dateTime: '2025-07-05',
          PM3: '20.0',
          AM3: '15.0',
          description: '',
        },
        {
          dateTime: '2025-07-06',
          PM3: '20.0',
          AM3: '12.0',
          description: '',
        },
        {
          dateTime: '2025-07-07',
          PM3: '27.0',
          AM3: '14.0',
          description: '',
        },
        {
          dateTime: '2025-07-08',
          PM3: '32.0',
          AM3: '18.0',
          description: '',
        },
        {
          dateTime: '2025-07-09',
          PM3: '32.0',
          AM3: '19.0',
          description: '',
        },
        {
          dateTime: '2025-07-10',
          PM3: '32.0',
          AM3: '22.0',
          description: '',
        },
        {
          dateTime: '2025-07-11',
          PM3: '32.0',
          AM3: '20.0',
          description: '',
        },
        {
          dateTime: '2025-07-12',
          PM3: '33.0',
          AM3: '21.0',
          description: '',
        },
        {
          dateTime: '2025-07-13',
          PM3: '31.0',
          AM3: '19.0',
          description: '',
        },
        {
          dateTime: '2025-07-14',
          PM3: '30.0',
          AM3: '20.0',
          description: '',
        },
        {
          dateTime: '2025-07-15',
          PM3: '30.0',
          AM3: '20.0',
          description: '',
        },
      ],
      skipDuplicates: true,
    });
    console.log('Weather OK!');
  }
  catch(err){
    console.log('Weather err!', err);
  }



}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
