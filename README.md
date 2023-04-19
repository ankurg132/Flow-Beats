# FLOW BEATS

Are you tired of playing games that don't pay off? Well, with Flow Beats, you can finally put the "play" in "pay-to-play"!

So, get ready to dive into Flow Beats, the ultimate multi-gaming platform built on Flow!
Our P2E (Play-to-Earn) model and in-game rewards system is designed to help you earn valuable rewards while playing your favourite games.

By using Flow Beats, you can enjoy a wide variety of games all in one place. Whether you're into indie games, or casual puzzle games, we've got something for everyone. And with our in-game rewards system, you'll be able to earn valuable rewards that can be redeemed for real-world value.

But what really sets us apart is our easy onboarding process. Flow Beats leveraged the Niftory's wallet and NFT API, which includes Niftory's social login and add or switch wallet feature. This means you can easily create and manage digital assets directly within the game interface, without the need for a separate wallet. We've eliminated the complexity and friction associated with blockchain transactions, making it easier for you to engage with our games and earn valuable rewards.
You can also buy and sell your digital assets directly from the platform.

Flow Beats makes it easy for you to find the games you love and earn rewards while doing it. It's literary just

1. Wake Up 2. Play 3. Eat 4. Sleep 5. Repeat.
So whether you're a hardcore gamer or just looking for a casual gaming experience, Flow Beats has something for everyone.

## Usage

### Configuration

This app uses [dotenv](https://github.com/motdotla/dotenv) for configuration, so you can set your app's environment variables by creating a `.env` file in this directory.

See [.env.example](./.env.example) for an example of how to configure these environment variables.

### Installing Dependencies

To install the dependencies of this app.

Use:
```
yarn install
```

### Running the app

Once your `.env` file is set up, you can run the app locally with:
```
yarn dev
```

## Overview

### Stack:

- Web framework: [Next.js](https://nextjs.org/)
- Auth framework: [NextAuth](https://next-auth.js.org/)
- Graph QL Client: [graphql-request](https://github.com/prisma-labs/graphql-request)
- React state management: [urql](https://formidable.com/open-source/urql/) and [SWR](https://swr.vercel.app/docs/with-nextjs)
- GraphQL codegen: [graphql-codeg-generator](https://www.graphql-code-generator.com/)

### Authentication

This app demonstrates three forms of authentication in the Niftory API.

#### User authentication

We use [NextAuth](https://next-auth.js.org/) to manage user sessions in this app.

[Our configuration](pages/api/auth/[...nextauth].ts) uses Niftory as the only OAuth provider and saves the user's Niftory token in the session.

The browser's [GraphQL client](src/components/GraphQLClientProvider.tsx) then includes that token in every request to the Niftory API as a bearer token in the `Authorization` header

#### App Credentials authentication using NextJS API routes or in your backend.

If you want to make requests using the app's credentials instead of the User's credentials for performing admin only tasks then that can be done using the [Serverside GraphQL Client](src/graphql/getClientForServer.ts).

Note - This client should not be used in the frontend, it should either be used in the backend of your app or in the [NextJS API Routes](https://nextjs.org/docs/api-routes/introduction). 
