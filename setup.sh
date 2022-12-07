echo "Setting up project..."
mkdir db
mkdir db/KickCase
mkdir db/KickViolations
mkdir db/TimeoutCase
mkdir db/TimeoutViolations
mkdir db/UserCurrencyWallet
mkdir db/Violations
mkdir db/WarnCase
mkdir db/WarnViolations

echo "Run /resetcase command in Discord; After RESTART THE BOT"
echo "After; run this command in cmd deno task start to start the bot. (ONLY RUN SETUP ON INITAL RUN)"
sleep 8s
deno task start