// deno-lint-ignore-file
import { configs } from '../../configs.ts';
import {
  ApplicationCommandTypes,
  InteractionResponseTypes
} from '../../deps.ts';
import { dbChangeData, getdbValue } from '../Rtsrs.Database/mod.ts';
import { log } from '../Rtsrs.Utils/logger.ts';
import {
  KickCase,
  TimeoutCase,
  WarnCase
} from '../Rtsrs.Violation/ViolationManager.ts';
import { createCommand } from './mod.ts';
createCommand({
  name: 'resetcase',
  description: 'resetcase Owner NEEDS TO RESTART BOT',
  type: ApplicationCommandTypes.ChatInput,
  devOnly: true,

  execute: async (Bot, interaction) => {
    try {
      if (interaction?.member === undefined) return;
      if (interaction.member.id.toString() === configs.owner) {
        await dbChangeData('WarnCurrentCase', 0, WarnCase);
        await dbChangeData('TimeoutCurrentCase', 0, TimeoutCase);
        await dbChangeData('KickCurrentCase', 0, KickCase);
        console.log(await getdbValue('TimeoutCurrentCase', TimeoutCase));
        console.log(await getdbValue('WarnCurrentCase', WarnCase));
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
    } catch {} finally {
      throw "RESTART BOT"
    }
  }
});