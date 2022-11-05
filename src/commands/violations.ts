// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { getdbValue } from '../database/mod.ts';
import { rdomcolor } from '../utils/colors.ts';
import { createCommand } from './mod.ts';
import { Violations } from './timeout.ts';
import { WarnViolations } from './warn.ts';
createCommand({
  name: 'violations',
  description: 'reviews violations',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'user',
      required: true,
    },
    // {
    //   type: ApplicationCommandOptionTypes.String,
    //   name: 'table',
    //   description: 'What Tables to Search from',
    //   required: true,
    //   choices: [
    //     {
    //       name: 'WarnViolations',
    //       value: 'WarnViolations',
    //     },
    //     {
    //       name: 'TimeoutViolations',
    //       value: 'TimeoutViolations',
    //     },
    //   ],
    // },
  ],
  execute: async (Bot, interaction) => {
    if (interaction?.data?.options === undefined) return;
    const user = interaction.data.options[0].value!;
    // const table = interaction.data.options[1].value!;
    // console.log(table);

    // if ((await dbHasValue(user.toString(), Violations)) === false) {
    //   return;
    // }
    // if ((await dbHasValue(user.toString(), WarnViolations)) === false) {
    //   return;
    // }

    let data2 = JSON.stringify(
      await getdbValue(user.toString(), WarnViolations)
    );

    let data1 = JSON.stringify(await getdbValue(user.toString(), Violations));

    const day = format(new Date(), 'HH:mm');
    let embed1 = new Embeds()
      .setTitle(`Violations Timeout`)
      .setColor(rdomcolor())
      .setDescription(
        `**Timeout Violations Cases for <@${user}>.** \n \n >>> **Case Numbers: ${data1}** \n \n *Hint: you can use /case (casenumber) for more info*`
      )
      .setFooter(`rtsrs • Violations for <@${user}> • ${day}`)
      .addEmbed()
      .setTitle(`Violations Warn`)
      .setColor(rdomcolor())
      .setDescription(
        `**Warn Violations Cases for <@${user}>.** \n \n >>> **Case Numbers: ${data2}** \n \n *Hint: you can use /case (casenumber) for more info*`
      )
      .setFooter(`rtsrs • Violations for <@${user}> • ${day}`);

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          flags: 64,
          embeds: embed1,
        },
      }
    );
  },
});
