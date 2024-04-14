import { Bot } from "../../rtsrs.ts";
import { configs } from "../../configs.ts";
import {
  UserConfigOptions,
  UserConfigSettings,
} from "../Rtsrs.UserConfig/mod.ts";

Bot.events.guildMemberAdd = async (_, member, _user) => {
  if (
    UserConfigSettings.get(UserConfigOptions.AllowWelcomeMessageSetting) ===
      true
  ) {
    await Bot.helpers.sendMessage(configs.WELCOME_CHANNEL, {
      content: `Welcome to the server <@${member.id}>!`,
    });
  }
};
