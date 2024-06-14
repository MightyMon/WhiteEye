import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

async function pushDataToDb(apiUrl: string): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:3000/api/ipLiveChk?ip='+apiUrl);
    console.log("got response");
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${apiUrl}`);
    }

    const data: { ip: string; isalive: string }[] = await response.json();
    console.log(data);

    // Step 2: Insert data into the database
    
    const promises = data.map((item) =>
      prisma.ipquick.upsert({
        where: { ip: item.ip },
        update: { isalive: "true" },
        create: {
          ip: item.ip,
          isalive: "true",
        },
      })
    );


    await Promise.all(promises);

    console.log('Data successfully pushed to the database!');
    return true;
  } catch (error) {
    console.error('Error pushing data to the database:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: any, res: NextApiResponse) {

  const apiUrl = `10.113.23.47/23`;

  const result = await pushDataToDb(apiUrl);

  if (result) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
