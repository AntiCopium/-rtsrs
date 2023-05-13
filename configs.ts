import { dotEnvConfig } from './deps.ts';

// Get the .env file that the user should have created, and get the token
export const env = dotEnvConfig({ export: true, path: './.env' });
export const token = env.BOT_TOKEN || '';
export const botName = env.BOT_NAME || '';
export const owner = env.OWNER_ID || '';
export const USER_LOG_CHANNEL = env.USER_LOG_CHANNEL || '';
export const BOT_MOD_CMD_LOG_CHANNEL  = env.BOT_MOD_CMD_LOG_CHANNEL || '';

export interface Config {
  token: string;
  botId: bigint;
  owner: bigint;
  botName: string;
}

export const configs = {
  /** Get token from ENV variable */
  token,
  owner,
  USER_LOG_CHANNEL,
  BOT_MOD_CMD_LOG_CHANNEL,
  botName,
  /** Get the BotId from the token */
  botId: BigInt(atob(token.split('.')[0])),
  /** The server id where you develop your bot and want dev commands created. */
  devGuildId: BigInt(env.DEV_GUILD_ID!),
};
