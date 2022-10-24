// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import { sleep } from 'https://deno.land/x/sleep/mod.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import {
  createCommand,
  day,
  dbChangeData,
  dbHasValue,
  getdbValue,
  setdbValue,
} from './mod.ts';

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

    const msg = JSON.stringify(
      Object.fromEntries(interaction.data.resolved.users),
      (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    );
    const user = interaction.user.id;

    if ((await dbHasValue(user.toString())) === false) {
      await setdbValue(user.toString(), user);
    }

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `${msg} ${day}`,
        },
      }
    );
  },
});
