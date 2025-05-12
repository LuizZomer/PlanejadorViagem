import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const preferencias = [
  'Praia',
  'Montanha',
  'Cachoeira',
  'Cidade histórica',
  'Gastronomia',
  'Vida noturna',
  'Museus',
  'Esportes radicais',
  'Trilhas',
  'Spa',
  'Resort',
  'Cruzeiro',
  'Mochilão',
  'Glamping',
  'Compras',
  'Arquitetura',
  'Ilha',
  'Internacional',
  'Retiro espiritual',
];

async function main() {
  await Promise.all(
    preferencias.map((name) =>
      prisma.preferences.create({
        data: { name },
      }),
    ),
  );
}

main()
  .then(() => {
    console.log('Seed concluída!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
