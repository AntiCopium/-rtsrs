import { writeJson } from "https://deno.land/std@0.66.0/fs/write_json.ts";

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

setInterval(async function() {
 const data = Object.fromEntries(UserConfigSettings);
  console.log(data);
  
  try {
    await writeJson('./src/Rtsrs.UserConfig/UserConfigSettings.json', data, { create: true, spaces: 2}); // Write the JSON data to the file
    console.log('UserConfigSettings.json updated successfully!');
  } catch (error) {
    console.error('Error writing to UserConfigSettings.json:', error);
  }
}, 2 * 1000); 