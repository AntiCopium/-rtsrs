// deno-lint-ignore-file
import { format } from "https://deno.land/std@0.91.0/datetime/mod.ts";
import Embeds from "https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts";
import * as mod from "https://deno.land/x/random@v1.1.2/Random.js";
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "doa",
  description: "rtsrs has 1 in 8 chance of dead",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    const day = format(new Date(), "HH:mm");
    const embedDead = new Embeds()
      .setTitle("rtsrs dead or alive success")
      .setColor("#880808")
      .setDescription(`💀🔫 you died nigga`)
      .setFooter(`rtsrs bot ${day}`);

    const embedAlive = new Embeds()
      .setTitle("rtsrs dead or alive success")
      .setColor("#125e94")
      .setDescription(`😮‍💨 alive`)
      .setFooter(`rtsrs bot ${day}`);

    const r = new mod.Random().pick
    (
      embedAlive, 
      embedAlive, 
      embedAlive, 
      embedAlive, 
      embedAlive, 
      embedAlive, 
      embedAlive, 
      embedDead
      );
    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          embeds: r,
        },
      },
    );
  },
});
