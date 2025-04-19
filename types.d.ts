// type ipalive ={
//     ip : String
//     isalive : String
// }

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string; // Add role here
    };
  }

  interface User {
    role: string; // Add role here
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
