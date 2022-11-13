// deno-lint-ignore-file
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../../deps.ts';
import { createCommand, day } from '../../Rtsrs.Commands/mod.ts';
import { rdomcolor } from '../../Rtsrs.Utils/colors.ts';
import { addToUserBalance } from '../wallet/wallet.ts';

createCommand({
  name: 'addcoins',
  description: 'adds more to ur  current balance',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'user to add',
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.Number,
      name: 'amount',
      description: 'amount to add',
      required: true,
    },
  ],
  execute: async (Bot, interaction) => {
    if (interaction.user === undefined) return;
    if (interaction.data?.options === undefined) return;
    const userToAdd = interaction.data.options[0].value!;
    const amount = interaction.data.options[1].value!;
    const userUsername = interaction.user.username;
    const balance = await addToUserBalance(userToAdd, amount);
    const embed = new Embeds()
      .setColor(rdomcolor())
      .setTitle(`${userUsername}'s New  Balance`)
      .setDescription(
        `*Your balance always changes*\n\n>>> ***Balance:*** *${balance}*$\n ***Daily Income:*** *Not Done*\n \n *Hint: you can use /beg to beg for money.*`
      )
      .setFooter(`rtsrs • User Balance • ${day}`);
    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          embeds: embed,
        },
      }
    );
  },
});
