// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import { ApplicationCommandOptionTypes } from 'https://deno.land/x/discordeno@17.0.0/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import * as mod from 'https://deno.land/x/random@v1.1.2/Random.js';
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { rdomcolor } from '../Rtsrs.Utils/colors.ts';
import { createCommand } from './mod.ts';

createCommand({
  name: 'randomnumber',
  description: 'submits a random number from (range)',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.Integer,
      name: 'range',
      description: 'a range to go 1 to (range)',
      required: true,
    },
  ],
  execute: async (Bot, interaction) => {
    if (interaction.data?.options === undefined) {
      return;
    }
    const int = interaction.data?.options[0].value;
    const day = format(new Date(), 'HH:mm');
    const number = new mod.Random();
    const n = number.int(1, int);

    const embed = new Embeds()
      .setTitle('rtsrs random number success')
      .setDescription(`**Generated number**: ${n}\n\nRange: ${int}`)
      .setColor(rdomcolor())
      .setFooter(`rtsrs bot ${day}`);
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
