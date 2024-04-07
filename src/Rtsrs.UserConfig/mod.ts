export enum UserConfigOptions {
    MessageDeletionLogSetting = "MessageDeletionLogSetting"
}


export let UserConfigSettings = new Map([
    /*
    DEFAULTS: 
        MessageDeletionLogSetting: false
    */
    [UserConfigOptions.MessageDeletionLogSetting, false]
])