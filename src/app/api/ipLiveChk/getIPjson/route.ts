import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
// import { IPCIDR } from 'ip-cidr';
import IPCIDR from 'ip-cidr';

const generateIPArray = (address : string) => {
  //get the list of ip from cidr
      const cidr = new IPCIDR(address);
      return cidr.toArray();
    };

export async function GET(req: any, res: NextApiResponse) {
  const url = new URL(req.url);
  const searchParam = new URLSearchParams(url.searchParams)
  const ip = searchParam.get('ip');

  //code to do anything to the cidr range given 
  if (ip) {
    console.log("Received IP:", ip);
    const ipArray = generateIPArray(ip);
    return NextResponse.json(ipArray);

  }
  
  const data = {
    message: "The range is recieved ",
  };

  return NextResponse.json(data);
}
