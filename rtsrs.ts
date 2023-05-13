import { configs } from './configs.ts';
import {
  BotWithCache,
  BotWithHelpersPlugin,
  Collection,
  createBot,
  enableCachePlugin,
  enableCacheSweepers,
  enableHelpersPlugin,
  enablePermissionsPlugin,
  GatewayIntents,
} from './deps.ts';
import { Command } from './src/Rtsrs.Types/commands.ts';
import { enableCollectorsPlugin } from "https://56o7ytls75b35pbz4g2endtqzmic437lqtrdkwrhpsnsrlt7cq5q.arweave.net/7538TXL_Q768OeG0Ro5wyxAub-uE4jVaJ3ybKK5_FDs/src/mod.ts"

// MAKE THE BASIC BOT OBJECT
const bot = createBot({
  token: configs.token,
  botId: configs.botId,
  intents:
    GatewayIntents.Guilds |
    GatewayIntents.GuildMessages |
    GatewayIntents.GuildMessageReactions |
    GatewayIntents.GuildMembers|
    GatewayIntents.MessageContent,
  events: {},
});

// ENABLE ALL THE PLUGINS THAT WILL HELP MAKE IT EASIER TO CODE YOUR BOT
enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);
export const botCollect = enableCollectorsPlugin(bot, {
  collectionExpirationCheckInterval: 30000,
  defaultCollectorExpiration: 30000,
});

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
  helpers: any;
  commands: Collection<string, Command>;
}

// THIS IS THE BOT YOU WANT TO USE EVERYWHERE IN YOUR CODE! IT HAS EVERYTHING BUILT INTO IT!
export const Bot = bot as BotClient;

// ***** ***    ****           *       *******         ***** ***        *******
// ******  * **   *  *************      *       ***    ******  * **      *       ***
// **   *  *  **  *     *********       *         **   **   *  *  **     *         **
// *    *  *   **  *     *  *            **        *   *    *  *   **     **        *
//   *  *    *    **  *  **             ***              *  *    *       ***
//  ** **   *        *  ***            ** ***           ** **   *       ** ***
//  ** **  *        **   **             *** ***         ** **  *         *** ***
//  ** ****         **   **               *** ***       ** ****            *** ***
//  ** **  ***      **   **                 *** ***     ** **  ***           *** ***
//  ** **    **     **   **                   ** ***    ** **    **            ** ***
//  *  **    **      **  **                    ** **    *  **    **             ** **
//     *     **       ** *      *               * *        *     **              * *
// ****      ***       ***     *      ***        *     ****      ***   ***        *
// *  ****    **         *******      *  *********     *  ****    **   *  *********
// *    **     *            ***       *     *****      *    **     *   *     *****
// *                                  *                *               *
// **                                 **               **              **
// PREPARE COMMANDS HOLDER
Bot.commands = new Collection();
