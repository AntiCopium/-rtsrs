// deno-lint-ignore-file
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { createCommand } from './mod.ts';

createCommand({
  name: 'black',
  description: 'blackness',
  type: ApplicationCommandTypes.ChatInput,
  devOnly: true,
  execute: async (Bot, interaction) => {
    const day = format(new Date(), 'HH:mm');
    const embed = new Embeds()
      .setTitle('George floyds breathtaking words')
      .setColor("#000000")
      .setImage("https://cdn.discordapp.com/attachments/929456196111433781/1031739676098318347/blackness.gif")
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
