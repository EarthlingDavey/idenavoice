## idenavoice.com

idenavoice is a solution to online voting - the project uses Idena's unique proof-of-person mechanism:

- One person cannot cast multiple votes.
- Questions and votes are all stored on the public Idena blockchain, also backed up to a centralised database.
- Votes can be cast and results can be read, saved, and shown anywhere.
- Pseudo-anonymous participation in democratic voting.
- Decentralised & uncensorable.

[idenavoice.com](https://idenavoice.com)

## Idena

Idena is a proof-of-person blockchain. All users take part in periodic validation sessions to prove that they're a human and not a bot.

Users don't supply any personal information, they remain pseudo-anonymous, similar to Bitcoin or Ethereum.

[idena.io](https://idena.io)

## May - June 2020 Hackathon info

### Challenge Description

> - In this challenge, we would like to see that your website or application can authenticate users with the Idena app (read about sign-in with Idena protocol here) using the Idena cryptoidentity address and give them useful privileges depending on their cryptoidentity status on the Idena blockchain.
> - Be creative and show how the cryptoidentity can be used.

More information on the hackathon can be found on the [gitcoin issue page](https://gitcoin.co/issue/idena-network/idena-go/431/4364)

### idenavoice response

In response to the challenge, the following features were recently added. In contrast to Q & A, the following information is not stored on the blockchain and instead it's on a database.

1. Users may sign-in with Idena
1. Depending on their account status, they will have different levels and limits of privelages.
1. A system for tagging questions has been created, this is a way to organise the website content - without centralised moderation.
1. Once signed-in an identity can create tags: 16 for humans ... 9 for Verified, 4 for Newbie and 0 for all others.
1. Identities can assign tags to questions if they are verified or above (\*)
1. Identities can mark tags as relevant or not relevant. Irrelevant tags will not be shown (\*)
1. In the identity profile, identities can vote on the tags by importance/preference.
1. The questions from the 3 most important tags are shown on the homepage.

(\*) = incomplete at time of submitting.

---

## Technical overview

This repository is related to the website. It contains 3 root folders `/ui-next` and `/api` - and `/nginx`, but that is related to local development only.

### Project structure

| Service | Repository              | Purpose                                                                                  |
| ------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| ui-next | [idenavoice][iv]        | Website frontend                                                                         |
| api     | [idenavoice][iv]        | Public API                                                                               |
| nginx   | [idenavoice][iv]        | Local development                                                                        |
| node    | [idenavoiceserver][ivs] | [Idena node][idena-go]^ rpc allows for querying of Idena blockchain                      |
| neo4j   | [idenavoiceserver][ivs] | [Neo4j Database][n4jc], cache for the on-chain voting data, and store for off-chain data |
| runner  | [idenavoiceserver][ivs] | Task runner, keeps database in sync with the chain                                       |

(^) = Credit is due to Rinzler78 for the [Idena node docker container][idena-go-docker]

The ui is React & Nextjs - it serves the website at [idenavoice.com](https://idenavoice.com)

And the api is a public api using apollo-server - it can be accessed at [idenavoice.com/graphql](https://idenavoice.com/graphql)

## Development

# Frontend

To start up the frontend (React) only follow these steps:

1. `cd ui-next`
1. `npm install`
1. `npm run dev`

This is the simplest way to work on the frontend. It connects to the live graphql API.

## Data model

## Plans - TODO list

### Hackathon

1. style the way tags are assigned to questions
1. how to remove tags
1. error messages (1/2)
1. interactive guide | explanation
1. testing
1. submit

### Frontend

1. Max length on text input
1. Text input placeholder contrast
1. Notify if question field is empty

[iv]: https://github.com/EarthlingDavey/idenavoice 'idenavoice frontend & API'
[ivs]: https://github.com/EarthlingDavey/idenavoiceserver 'idenavoice backend & database'
[n4jc]: https://neo4j.com/download-center/#community 'Neo4j community server database'
[idena-go]: https://github.com/idena-network/idena-go 'Golang implementation of the Idena network node'
[idena-go-docker]: https://github.com/Rinzler78/docker.idena-node 'Docker image for Idena network node'
