export enum UserConfigOptions {
    MessageDeletionLogSetting = "MessageDeletionLogSetting"
}

// config resets on bot reset. Will fix later

export const UserConfigSettings = new Map([
    /*
    DEFAULTS: 
        MessageDeletionLogSetting: false
    */
    [UserConfigOptions.MessageDeletionLogSetting, false]
])
