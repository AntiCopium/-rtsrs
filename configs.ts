import { dotEnvConfig } from './deps.ts';

// Get the .env file that the user should have created, and get the token
export const env = dotEnvConfig({ export: true, path: './.env' });
export const token = env.BOT_TOKEN || '';
export const owner = env.OWNER_ID || '';

export interface Config {
  token: string;
  botId: bigint;
  owner: bigint;
}

export const configs = {
  /** Get token from ENV variable */
  token,
  owner,
  /** Get the BotId from the token */
  botId: BigInt(atob(token.split('.')[0])),
  /** The server id where you develop your bot and want dev commands created. */
  devGuildId: BigInt(env.DEV_GUILD_ID!),
};
