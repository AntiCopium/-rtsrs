// deno-lint-ignore-file
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { dbChangeData, getdbValue } from '../database/mod.ts';
import { createCommand } from './mod.ts';
import { mutecase } from './timeout.ts';
createCommand({
  name: 'resetcase',
  description: 'resetcase Owner NEEDS TO RESTART BOT',
  type: ApplicationCommandTypes.ChatInput,
  devOnly: true,

  execute: async (Bot, interaction) => {
    await dbChangeData('currentCase', 0, mutecase);
    console.log(await getdbValue('currentCase', mutecase))
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
