import prisma from './lib/prisma';

async function check() {
  const catalogues = await prisma.catalogue.findMany({});
  console.log('Total catalogues in DB:', catalogues.length);
  catalogues.forEach((c: any) => {
    console.log(`ID: ${c.id} | Title: "${c.title}" | fileUrl: "${c.fileUrl}"`);
  });
}

check();
