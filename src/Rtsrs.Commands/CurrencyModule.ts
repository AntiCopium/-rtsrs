import Embeds from "https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts";
import { botName } from "../../configs.ts";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, InteractionResponseTypes } from "../../deps.ts";
import { addToUserBalance, getBalance } from "../Rtsrs.Currency/wallet.ts";
import { rdomcolor } from "../Rtsrs.Utils/colors.ts";
import { createCommand, timenow } from "./mod.ts";

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
        .setFooter(`${botName} • User Balance`);
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
        .setTimestamp(timenow.getTime())
        .setTitle(`${userUsername}'s New  Balance`)
        .setDescription(
          `*Your balance always changes*\n\n>>> ***Balance:*** *${balance}*$\n ***Daily Income:*** *Not Done*\n \n *Hint: you can use /beg to beg for money.*`
        )
        .setFooter(`${botName} • User Balance`);
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
  