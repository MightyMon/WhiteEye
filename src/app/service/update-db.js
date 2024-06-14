const fetch = require('node-fetch');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function pushDataToDb(apiUrl) {
  try {
    // Step 1: Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    // Step 2: Insert data into the database
    // Assuming data is an array of objects and your model is 'YourModel'
    const promises = data.map(item => {
      return prisma.ipquick.upsert({
        where: { ip: item.ip },
        update: { isalive: item.isalive },
        create: {
          ip: item.ip,
          isalive: item.isalive,
        },
      });
    });


    await Promise.all(promises);

    console.log('Data successfully pushed to the database!');
  } catch (error) {
    console.error('Error pushing data to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage
const apiUrl = env("SYSTEM_URL") +"/api/ipLiveChk";
pushDataToDb(apiUrl);