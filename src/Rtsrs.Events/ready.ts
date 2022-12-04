import { red } from '../../deps.ts';
import { Bot } from '../../rtsrs.ts';
import log from '../Rtsrs.Utils/logger.ts';

Bot.events.ready = async (_, payload) => {
  log.info(
    `[READY] Shard ID ${payload.shardId} of ${
      Bot.gateway.lastShardId + 1
    } shards is ready!`
  );

  if (payload.shardId === Bot.gateway.lastShardId) {
    await botFullyReady();
  }
};

// This function lets you run custom code when all your bot's shards are online.
async function botFullyReady() {
  // DO STUFF YOU WANT HERE ONCE BOT IS FULLY ONLINE.
  console.clear();
  console.log(
    red(` 
    ██▀███  ▄▄▄█████▓  ██████  ██▀███    ██████ 
    ▓██ ▒ ██▒▓  ██▒ ▓▒▒██    ▒ ▓██ ▒ ██▒▒██    ▒ 
    ▓██ ░▄█ ▒▒ ▓██░ ▒░░ ▓██▄   ▓██ ░▄█ ▒░ ▓██▄   
    ▒██▀▀█▄  ░ ▓██▓ ░   ▒   ██▒▒██▀▀█▄    ▒   ██▒
    ░██▓ ▒██▒  ▒██▒ ░ ▒██████▒▒░██▓ ▒██▒▒██████▒▒
    ░ ▒▓ ░▒▓░  ▒ ░░   ▒ ▒▓▒ ▒ ░░ ▒▓ ░▒▓░▒ ▒▓▒ ▒ ░
      ░▒ ░ ▒░    ░    ░ ░▒  ░ ░  ░▒ ░ ▒░░ ░▒  ░ ░
      ░░   ░   ░      ░  ░  ░    ░░   ░ ░  ░  ░  
       ░                    ░     ░           ░  
                                                 
    `)
  );
  await new Promise((r) => setTimeout(r, 3800));
  log.info('[READY] Connected to websocket.');
}
