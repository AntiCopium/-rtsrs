<h1 align="center">
  rtsrs
  <br>
  <a href="#"><img src="https://user-images.githubusercontent.com/90981829/200134119-2aee089d-7ac0-490e-a031-3be4428930ba.png" width="64" height="64"></a>
</h1>
<br>
<p align="center">
  <img src="https://img.shields.io/badge/deno%20js-000000?style=for-the-badge&logo=deno&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
  <br>
  <i>Discord bot built with Discordeno</i>
</p>
<hr>
<br>

## 📜 Features
### Case
<a href="#"><img src="https://user-images.githubusercontent.com/90981829/200134452-d9a7051f-536f-4dbc-8bcf-512a4304cf34.png" width="360"></a>

### Timeout
<a href="#"><img src="https://user-images.githubusercontent.com/90981829/200134408-93ee97c7-7b7a-48c8-9bea-a288d40ffca7.png" width="360"></a>


### Violations
<a href="#"><img src="https://user-images.githubusercontent.com/90981829/200134428-514b2f3e-32ff-4dc9-97af-c9c01b50ff5b.png" width="360"></a>

### Warn
<a href="#"><img src="https://user-images.githubusercontent.com/90981829/200134418-630211a9-bcbc-4860-a0ca-c44a5cf5225e.png" width="360"></a>

### MORE FEATURES, AND MORE TO COME!

# 🤖 How to run (windows)

1. Go to the [releases](https://github.com/cantevenread/-rtsrs/releases/tag/installer) page and install the latest installer.

2. Make a folder and move the installer into the folder than run the installer and fill the questions with correct info make sure you dont add any spaces, "", or ''

3. Once completed the installer should make a folder named `rtsrs` open it and run the rtsrs.exe

4. Then run fresh start option. This will freshly restart the cases. 


#### ❗***MAKE SURE TO RUN FRESH START; IF NOT CLOSE rtsrs.exe AND RERUN IT WITH FRESH START***

# From Source (mac, linux,etc)

### Setup

1. Be sure to have [deno](https://deno.land/manual@v1.35.0/getting_started/installation) and [rust-lang](https://www.rust-lang.org/learn/get-started) installed.

2. Clone the project.
```cmd
$ git clone https://github.com/cantevenread/rtsrs.git
```
3. Delete the installer folder, and rtsrs.exe ( since you will compile it your own )

4. Make a .env file ( name a file `.env` ) and copy paste the info below and fill in the info in between the quotes.
`ex. BOT_NAME='BOT'`

```
BOT_NAME=''
BOT_TOKEN=''
DEV_GUILD_ID=''
OWNER_ID=''
USER_LOG_CHANNEL=''
BOT_MOD_CMD_LOG_CHANNEL=''
WELCONE_CHANNEL=''
```

5. After completed save and run this command in the terminal. <br>
 ```console
   sudo cargo run
   ```

You will be given options. Run option 2 for the initial start-up, and to reset the database entries. You MAY have to follow the command with sudo. After the initial start-up you can just click enter or enter number 1 for a normal start.

#### ❗***MAKE SURE TO RUN FRESH START; IF NOT CLOSE IT AND RE RUN IT***
#### ❗***ERRORS MAY OCCUR DONT WORRY***

### Info

The fresh start run opetion  resets the db values. So any db value is deleted/ overwritten
Deafult starts from the last db value. This project is designed to run and host your own discord bot.

### 🗿 ENJOY
