import { red } from '../../deps.ts';
import { Bot } from '../../rtsrs.ts';
import log from '../Rtsrs.Utils/logger.ts';

Bot.events.ready = async (_, payload) => {

  if (payload.shardId === Bot.gateway.lastShardId) {
    await botFullyReady();
  }
};

// This function lets you run custom code when all your bot's shards are online.
async function botFullyReady() {
  // DO STUFF YOU WANT HERE ONCE BOT IS FULLY ONLINE.
  // console.log(
  //   red(` 
  //   ██▀███  ▄▄▄█████▓  ██████  ██▀███    ██████ 
  //   ▓██ ▒ ██▒▓  ██▒ ▓▒▒██    ▒ ▓██ ▒ ██▒▒██    ▒ 
  //   ▓██ ░▄█ ▒▒ ▓██░ ▒░░ ▓██▄   ▓██ ░▄█ ▒░ ▓██▄   
  //   ▒██▀▀█▄  ░ ▓██▓ ░   ▒   ██▒▒██▀▀█▄    ▒   ██▒
  //   ░██▓ ▒██▒  ▒██▒ ░ ▒██████▒▒░██▓ ▒██▒▒██████▒▒
  //   ░ ▒▓ ░▒▓░  ▒ ░░   ▒ ▒▓▒ ▒ ░░ ▒▓ ░▒▓░▒ ▒▓▒ ▒ ░
  //     ░▒ ░ ▒░    ░    ░ ░▒  ░ ░  ░▒ ░ ▒░░ ░▒  ░ ░
  //     ░░   ░   ░      ░  ░  ░    ░░   ░ ░  ░  ░  
  //      ░                    ░     ░           ░  
                                                 
  //   `)
  // );
  log.info('Ready...');
}
