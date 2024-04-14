export enum UserConfigOptions {
  MessageDeletionLogSetting = "MessageDeletionLogSetting",
  AllowNSFWSetting = "AllowNSFWSetting",
  AllowWelcomeMessageSetting = "AllowWelcomeMessageSetting",
}

// config resets on bot reset. Will fix later

export const UserConfigSettings = new Map([
  /*
    DEFAULTS:
        MessageDeletionLogSetting: false
        AllowNSFWSetting: true
        AllowWelcomMessageSetting: true
    */
  [UserConfigOptions.MessageDeletionLogSetting, false],
  [UserConfigOptions.AllowNSFWSetting, true],
  [UserConfigOptions.AllowWelcomeMessageSetting, true],
]);
