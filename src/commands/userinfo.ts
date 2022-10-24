// deno-lint-ignore-file
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import {
  createCommand,
  day,
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

    if (!(await dbHasValue(user.toString())) === true) {
      await setdbValue(user.toString(), user);
    }

    console.log(msg);
    console.log(await getdbValue('user'));

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
