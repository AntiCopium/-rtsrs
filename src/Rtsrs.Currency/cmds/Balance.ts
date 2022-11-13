// deno-lint-ignore-file
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../../deps.ts';
import { createCommand, day, timenow } from '../../Rtsrs.Commands/mod.ts';
import { rdomcolor } from '../../Rtsrs.Utils/colors.ts';
import { getBalance } from '../wallet/wallet.ts';

createCommand({
  name: 'bal',
  description: 'ur current balance',
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    if (interaction.user === undefined) return;
    const userToFetchBalance = interaction.user.id;
    const userUsername = interaction.user.username;
    const balance = await getBalance(userToFetchBalance);
    const embed = new Embeds()
      .setColor(rdomcolor())
      .setTimestamp(timenow.getTime())
      .setTitle(`${userUsername}'s Current Balance`)
      .setDescription(
        `*Your balance always changes...*\n\n>>> ***Balance:*** *${balance}*$\n ***Daily Income:*** *Not Done*\n ***Bank:***  *TODO*\n \n *Hint: you can use /beg to beg for money.*`
      )
      .setFooter(`rtsrs • User Balance`);
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
