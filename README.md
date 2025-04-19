This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

View my ui at https://white-eye.vercel.app
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## PostgreSQL Setup Guide

This project uses a PostgreSQL database and Prisma as an ORM. To set up the database using Docker, follow these steps:

1.  Install Docker:

    *   Follow the instructions on the [Docker website](https://docs.docker.com/get-docker/).

2.  Run the PostgreSQL Docker container:

    ```bash
    docker run --name whiteeye-db -e POSTGRES_USER=whiteeye -e POSTGRES_PASSWORD=password -e POSTGRES_DB=whiteeye -p 5432:5432 -d postgres
    ```

3.  Create the `.env` file:

    *   Create a `.env` file in the root of the project and add the following environment variable:

        ```
        DATABASE_URL="postgresql://whiteeye:password@localhost:5432/whiteeye?schema=public"
        ```

    *   You can also create an `example.env` file with the same content for other developers to use.

4.  Configure Prisma:

    *   Update the `DATABASE_URL` in the `.env` file to match your PostgreSQL connection settings.
    *   Run `npx prisma migrate dev` to create the database schema.
    *   Run `npx prisma generate` to generate the Prisma client.

5.  Connect to the PostgreSQL database:

    *   You can use a PostgreSQL client like `psql` to connect to the database.

6.  Run the application:

    *   Run `npm run dev` to start the development server.

```
