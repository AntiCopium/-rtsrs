// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { dbHasValue, getdbValue } from '../Rtsrs.Database/mod.ts';
import { rdomcolor } from '../Rtsrs.Utils/colors.ts';
import { createCommand } from './mod.ts';
import { TimeoutCase } from '../Rtsrs.Violation/ViolationManager.ts';
import { WarnCase } from '../Rtsrs.Violation/ViolationManager.ts';
createCommand({
  name: 'case',
  description: 'reviews a timeout case',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.Integer,
      name: 'casenumber',
      description: 'Case number',
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.String,
      name: 'table',
      description: 'What Tables to Search from',
      required: true,
      choices: [
        {
          name: 'WarnViolations',
          value: 'WarnViolations',
        },
        {
          name: 'TimeoutViolations',
          value: 'TimeoutViolations',
        },
      ],
    },
  ],
  execute: async (Bot, interaction) => {
    if (interaction?.data?.options === undefined) return;
    let embed = new Embeds();
    const number = interaction.data.options[0].value!;
    const table = interaction.data.options[1].value!;
    console.log(table);

    if (table === 'TimeoutViolations') {
      if ((await dbHasValue(number.toString(), TimeoutCase)) === false) {
        return;
      }

      let data = await getdbValue(number.toString(), TimeoutCase);

      const day = format(new Date(), 'HH:mm');
      embed = new Embeds()
        .setTitle(`case ${number}`)
        .setColor(rdomcolor())
        .setDescription(
          `**If you need further info contact the Moderator.** \n \n ${data}`
        )
        .setFooter(`rtsrs • Case Review Of ${number} • ${day}`);
    }
    if (table === 'WarnViolations') {
      if ((await dbHasValue(number.toString(), WarnCase)) === false) {
        return;
      }

      let data = await getdbValue(number.toString(), WarnCase);

      const day = format(new Date(), 'HH:mm');
      embed = new Embeds()
        .setTitle(`case ${number}`)
        .setColor(rdomcolor())
        .setDescription(
          `**If you need further info contact the Moderator.** \n \n ${data}`
        )
        .setFooter(`rtsrs • Case Review Of ${number} • ${day}`);
    }

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          flags: 64,
          embeds: embed,
        },
      }
    );
  },
});
