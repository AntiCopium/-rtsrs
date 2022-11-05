// deno-lint-ignore-file
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { createCommand } from './mod.ts';

createCommand({
  name: 'eval',
  description: 'eval',
  type: ApplicationCommandTypes.ChatInput,
  devOnly: true,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'stuff',
      description: 'Runs the sript',
      required: true,
    },
  ],

  execute: async (Bot, interaction) => {
    if (interaction?.member === undefined) return;
    if (interaction?.data?.options === undefined) return;
    const stuff = interaction.data.options[0].value?.toString()!;
    if (interaction.member.id.toString() === '727286619207630931') {
      try {
        eval(stuff);
      } catch (err) {
        console.log(err);
      }
    } else {
        return;
    }
    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `Eval Ran`,
        },
      }
    );
  },
});
