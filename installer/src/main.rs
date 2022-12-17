use git2::Repository;
use std::env;
use std::fs;
use std::path::PathBuf;
use std::process;
use std::process::Command;
use std::process::Stdio;

fn check_deno_installed() -> bool {
    let output = Command::new("where")
        .arg("deno")
        .output()
        .expect("failed to execute process");

    return output.status.success();
    println!("{:?}", output);
}

fn install_deno() {
    let output = Command::new("curl")
        .arg("-fsSL")
        .arg("https://deno.land/x/install/install.sh")
        .stdout(Stdio::piped())
        .spawn()
        .expect("failed to execute process");

    let output = output.wait_with_output().expect("failed to wait on child");

    let output = String::from_utf8(output.stdout).unwrap();

    let output = Command::new("sh")
        .arg("-c")
        .arg(output)
        .output()
        .expect("failed to execute process");

    assert!(output.status.success());
}

fn main() {
    println!("Checking Deno Installation");
    if !check_deno_installed() {
        println!("Installing Deno");
        install_deno();
    } else {
        println!("Deno Already Installed");
    }
    let repo_url = "https://github.com/cantevenread/-rtsrs.git";
    let repo_name = "-rtsrs";

    let current_dir = env::current_dir().unwrap();
    let repo_dir = current_dir.join(repo_name);
    println!("Cloning Repo...");
    if !repo_dir.exists() {
        let repo = match Repository::clone(repo_url, current_dir.join("-rtsrs")) {
            Ok(repo) => repo,
            Err(e) => panic!("fail clone {}", e),
        };
    }
    println!("Repo cloned");

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
