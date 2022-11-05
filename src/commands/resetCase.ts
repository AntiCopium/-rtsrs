// deno-lint-ignore-file
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { dbChangeData, getdbValue } from '../database/mod.ts';
import { log } from '../utils/logger.ts';
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
    if (interaction.member.id.toString() === '727286619207630931') {
      await dbChangeData('currentCase', 0, mutecase);
      await dbChangeData('currentCase', 0, WarnCase);
      console.log(await getdbValue('currentCase', mutecase));
      console.log(await getdbValue('currentCase', WarnCase));
      log.warn('Resseted Mute case');
      log.warn('Resseted Warn case');
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
