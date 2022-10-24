// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { createCommand, day, setdbValue } from './mod.ts';

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
    if (interaction?.data?.resolved?.users === undefined) return;
    await setdbValue('hello');

    const user = interaction.data.resolved.users;
    console.log(user);

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `${user} ${day}`,
        },
      }
    );
  },
});
