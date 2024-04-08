export enum UserConfigOptions {
  MessageDeletionLogSetting = 'MessageDeletionLogSetting',
  AllowNSFWSetting = 'AllowNSFWSetting',
}

// config resets on bot reset. Will fix later

export const UserConfigSettings = new Map([
  /*
    DEFAULTS: 
        MessageDeletionLogSetting: false
        AllowNSFWSetting: true
    */
  [UserConfigOptions.MessageDeletionLogSetting, false],
  [UserConfigOptions.AllowNSFWSetting, true],
]);
