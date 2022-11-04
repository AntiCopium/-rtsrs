// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { dbHasValue, getdbValue } from '../database/mod.ts';
import { rdomcolor } from '../utils/colors.ts';
import { createCommand } from './mod.ts';
import { mutecase } from './timeout.ts';
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
  ],
  execute: async (Bot, interaction) => {
    if (interaction?.data?.options === undefined) return;

    const x = interaction.data.options[0].value!;

    if ((await dbHasValue(x.toString(), mutecase)) === false) {
      return;
    }

    let data = await getdbValue(x.toString(), mutecase);

    const day = format(new Date(), 'HH:mm');
    const embed = new Embeds()
      .setTitle(`case ${x}`)
      .setColor(rdomcolor())
      .setDescription(
        `**If you need further info contact the Moderator.** \n \n ${data}`
      )
      .setFooter(`rtsrs • Case Review Of ${x} • ${day}`);
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
