// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { createCommand } from './mod.ts';

createCommand({
  name: 'userinfo',
  description: 'userinfo',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'mention user',
      required: true,
    },
  ],
  execute: async (Bot, interaction) => {
    const day = format(new Date(), 'HH:mm');
    if (interaction?.data?.resolved?.users === undefined) {
      return;
    }
    const user = interaction.data.resolved.users;
    console.log(user);

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `${user}`,
        },
      }
    );
  },
});
