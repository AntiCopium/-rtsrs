// deno-lint-ignore-file
import { configs } from '../../configs.ts';
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { dbChangeData, getdbValue } from '../Rtsrs.Database/mod.ts';
import { log } from '../Rtsrs.Utils/logger.ts';
import { createCommand } from './mod.ts';
import { mutecase } from './timeout.ts';
import { WarnCase } from './warn.ts';
createCommand({
  name: 'resetcase',
  description: 'resetcase Owner NEEDS TO RESTART BOT',
  type: ApplicationCommandTypes.ChatInput,
  devOnly: true,

  execute: async (Bot, interaction) => {
    if (interaction?.member === undefined) return;
    if (interaction.member.id.toString() === configs.owner) {
      await dbChangeData('currentCase', 0, mutecase);
      await dbChangeData('currentCase', 0, WarnCase);
      console.log(await getdbValue('currentCase', mutecase));
      console.log(await getdbValue('currentCase', WarnCase));
      log.warn('Resseted Mute case');
      log.warn('Resseted Warn case');
      log.fatal('RESTART BOT');
    } else {
      return;
    }
    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: 'Reseted cases to 0 ( owner needs to restart bot )',
        },
      }
    );
  },
});
