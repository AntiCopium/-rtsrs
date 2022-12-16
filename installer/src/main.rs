use std::env;
use std::fs;
use std::path::PathBuf;
use std::process;
use std::process::Command;

fn main() {
    let output_git = Command::new("which")
        .arg("git")
        .output()
        .expect("failed to execute process");

    let git_status = output_git.status;
    if git_status.success() {
        println!("git is installed");
    } else {
        println!("git is not installed");
        process::exit(0);
    }

    let repo_url = "https://github.com/cantevenread/-rtsrs.git";
    let repo_name = "-rtsrs";

    let current_dir = env::current_dir().unwrap();
    let repo_dir = current_dir.join(repo_name);

    if !repo_dir.exists() {
        let output = Command::new("git")
            .arg("clone")
            .arg(repo_url)
            .output()
            .expect("failed to execute process");

        println!("{}", String::from_utf8_lossy(&output.stdout));

        let status = output.status;
        println!("Status: {}", status);
    }

    println!("Enter your bot token: ");
    let mut token_input = String::new();
    std::io::stdin().read_line(&mut token_input).unwrap();

    println!("Enter your GUILD_ID token: ");
    let mut guild_id_input = String::new();
    std::io::stdin().read_line(&mut guild_id_input).unwrap();

    println!("Enter your OWNER_ID token: ");
    let mut owner_id_input = String::new();
    std::io::stdin().read_line(&mut owner_id_input).unwrap();

    println!("Enter your user_log token: ");
    let mut user_log_input = String::new();
    std::io::stdin().read_line(&mut user_log_input).unwrap();

    println!("Enter your mod_log token: ");
    let mut mod_log_input = String::new();
    std::io::stdin().read_line(&mut mod_log_input).unwrap();

    let final_env = format!(
        "
    BOT_TOKEN='{}'
    DEV_GUILD_ID='{}'
    OWNER_ID='{}'
    
    USER_LOG_CHANNEL='{}'
    BOT_MOD_CMD_LOG_CHANNEL='{}'",
        token_input.trim(),
        guild_id_input.trim(),
        owner_id_input.trim(),
        user_log_input.trim(),
        mod_log_input.trim()
    );

    let file_path = repo_dir.join(".env");

    fs::write(file_path, final_env).expect("Failed to write to file");
}
