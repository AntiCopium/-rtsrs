import { readAll } from "https://deno.land/std@0.99.0/io/util.ts";
import { dotEnvConfig } from "./deps.ts";
import {
  UserConfigOptions,
  UserConfigSettings,
} from "./src/Rtsrs.UserConfig/mod.ts";

// Get the .env file that the user should have created, and get the token
export const env = dotEnvConfig({ export: true, path: "./.env" });
export const token = env.BOT_TOKEN || "";
export const botName = env.BOT_NAME || "";
export const owner = env.OWNER_ID || "";
export const USER_LOG_CHANNEL = env.USER_LOG_CHANNEL || "";
export const BOT_MOD_CMD_LOG_CHANNEL = env.BOT_MOD_CMD_LOG_CHANNEL || "";
export const WELCOME_CHANNEL = env.WELCOME_CHANNEL || "";

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
  WELCOME_CHANNEL,
  /** Get the BotId from the token */
  botId: BigInt(atob(token.split(".")[0])),
  /** The server id where you develop your bot and want dev commands created. */
  devGuildId: BigInt(env.DEV_GUILD_ID!),
};

export async function initConfig() {
  const file = await Deno.open("./src/Rtsrs.UserConfig/rtsrs.config.json", {
    read: true,
  });
  const content = new TextDecoder().decode(await readAll(file));

  if (content.trim() === "") {
    console.error("Config file is empty or malformed.");
    return;
  }

  try {
    const configData = JSON.parse(content);
    for (const key in configData) {
      switch (key) {
        case UserConfigOptions.MessageDeletionLogSetting:
          UserConfigSettings.set(
            UserConfigOptions.MessageDeletionLogSetting,
            configData[key],
          );
          break;
        case UserConfigOptions.AllowNSFWSetting:
          UserConfigSettings.set(
            UserConfigOptions.AllowNSFWSetting,
            configData[key],
          );
          break;
        case UserConfigOptions.AllowWelcomeMessageSetting:
          UserConfigSettings.set(
            UserConfigOptions.AllowWelcomeMessageSetting,
            configData[key],
          );
          break;
        // Add more cases for other settings if needed
        default:
          console.error("Unknown setting:", key);
          break;
      }
    }
  } catch (error) {
    console.error("Error parsing JSON data from the config file:", error);
  }
}
