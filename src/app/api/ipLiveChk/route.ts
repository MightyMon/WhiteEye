import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
// import { IPCIDR } from 'ip-cidr';
import IPCIDR from 'ip-cidr';

const generateIPArray = (address : string) => {
      const cidr = new IPCIDR(address);
      return cidr.toArray();
    };
// async function getWithParams(url, params) {
//   // ... (code to build URL and send request)
//   const response = await fetch(fullUrl);

//   if (!response.ok) {
//     throw new Error(`Failed to fetch data: ${response.status}`);
//   }

//   const data = await response.json(); // Parse JSON response
//   return data;
// }

import ping from 'ping';
import async from "async";

async function isAlive(ipaddr: string): Promise<boolean> {
  try {
    const options = {
      timeout: 1000, // Adjust timeout as needed (milliseconds)
      extra: ['-c', '1'] // Send only 1 ping request (optional)
    };

    const response = await ping.promise.probe(ipaddr, options);
    //console.log(response);
    return response.alive;
  } catch (error) {
    //console.log(`Error pinging ${ipaddr}: ${error}`);
    return false; // Indicate error
  }
}
    
export async function GET(req: any, res: NextApiResponse) {
  const url = new URL(req.url);
  const searchParam = new URLSearchParams(url.searchParams)
  const ip = searchParam.get('ip');

  //code to do anything to the cidr range given 
  if (ip) {
    //console.log("Received IP:", ip);
    const ipArray = generateIPArray(ip);
    // console.log("Generated IP Array:");
    const resultjson= await checkIPs(ipArray)
    // console.log("50 , going to return this ",resultjson)
    // for (const address of ipArray) {
    //   console.log("IP address:", address); // Use `address` instead of `a` for clarity
    //   // if (await isAlive(address)){
    //   //   console.log("IP address is alive:");
    //   // }
    // }
    return NextResponse.json(resultjson);

  }
  
  const data = {
    message: "The range is recieved ",
  };

  return NextResponse.json(data);
}



async function checkIPs(ipArray) {
  const results = [];

  try {
    await Promise.race([
      
      async.each(ipArray, async (ip) => {
        // console.log(ip);
        try {
          const response = await isAlive(ip);
          if (response){
          results.push({ ip, isAlive: response });
          // console.log({ ip, isAlive: response });
        }
        } catch (error) {
          console.error(`Error pinging ${ip}: ${error}`);
          results.push({ ip, isAlive: false }); // Indicate error
        }
      }),
      createTimeoutPromise(10000, results), // Timeout after 10 seconds
    ]);
  } catch (error) {
    console.error('Error during checkIPs execution:', error);
    // Handle other potential errors during entire function execution (optional)
    return results; // Return results even if there were errors
  }

  return results;
}

function createTimeoutPromise(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeout);
  });
}

