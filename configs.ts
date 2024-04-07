import { writeJson } from "https://deno.land/std@0.66.0/fs/write_json.ts";
import { dotEnvConfig } from './deps.ts';
import { UserConfigSettings } from "./src/Rtsrs.UserConfig/mod.ts";

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

export function initConfigs() {
  const update = setInterval(async function() {
 const data = Object.fromEntries(UserConfigSettings);
  try {
    await writeJson(`./${botName}.config.json`, data, { create: true, spaces: 2}); // Write the JSON data to the file
  } catch (error) {
    console.error('Error writing to UserConfigSettings.json:', error);
  }
}, 1 * 1000); 
}
