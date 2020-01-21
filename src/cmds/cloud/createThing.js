/* eslint-disable no-console */
import yargs from 'yargs';
import { Client } from '@cesarbr/knot-cloud-sdk-js';
import options from './utils/options';

const createThing = async (args) => {
  const client = new Client({
    hostname: args.server,
    port: args.port,
    token: args.token,
    username: args.username,
    password: args.password,
    protocol: args.protocol,
  });

  await client.connect();
  const result = await client.registerDevice(args.id, args.name);
  console.log(result)
  await client.stop();
};

yargs
  .command({
    command: 'create-thing <id> <name>',
    desc: 'Create a thing',
    builder: (_yargs) => {
      _yargs
        .options(options)
    },
    handler: async (args) => {
      await createThing(args);
    },
  });
