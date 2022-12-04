// deno-lint-ignore-file
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { createCommand, timenow } from './mod.ts';

createCommand({
  name: 'test',
  description: 'test',
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    const embed = new Embeds()
      .setTimestamp(timenow.getTime())
      .setColor("#36393e")
      .setTitle('rtsrs test')
      .setDescription(`test`)
      .setFooter(`rtsrs bot`);
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
