use std::fs;
use std::io::{BufRead, BufReader};
use std::process::{Command, Stdio, Child};
use std::str;
use std::{thread, time};

fn main() -> std::io::Result<()> {
    let path = "db";

    // Check if the directory exists
    match fs::metadata(path) {
        Ok(metadata) => {
            if metadata.is_dir() {
                println!("{} is a directory", path);
            } else {
                println!("{} is not a directory", path);
            }
        }
        Err(_) => {
            println!("{} does not exist or there was an error accessing it", path);
        }
    }
    let output = Command::new("deno").arg("--version").output()?;
    let deno_version = String::from_utf8_lossy(&output.stdout);
    println!("{}", deno_version);

    // Check the version of the Rust compiler
    let output = Command::new("rustc").arg("--version").output()?;
    let rustc_version = String::from_utf8_lossy(&output.stdout);
    println!("{}", rustc_version);
    println!("RTSRS VERSION: #121622");

    let selected_option: i32;

    loop {
        println!("Please select an option:");
        println!("1. Start (Default)");
        println!("2. Check Run (Fresh start)");
        println!("Enter for default option");

        let mut input = String::new();

        std::io::stdin()
            .read_line(&mut input)
            .expect("Failed to read input");

        let trimmed_input = input.trim();

        if trimmed_input == "" {
            // If user pressed Enter without entering a value, treat it as Option A
            selected_option = 1;
            // println!("Option A selected");
            break;
        }

        match trimmed_input {
            "1" => {
                selected_option = 1;
                // println!("Option A selected");
                break;
            }
            "2" => {
                selected_option = 2;
                // println!("Option B selected");
                break;
            }
            _ => {
                println!("Invalid option, please try again.");
            }
        }
    }

    // Use the selected_option variable here
    println!("Selected option: {}", selected_option);

let process: Child = if selected_option == 1 {
    let child_process = Command::new("deno")
        .arg("task")
        .arg("start")
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()?;
    child_process
} else {
    let child_process = Command::new("deno")
        .arg("task")
        .arg("check-run")
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()?;
    child_process
};

    


    let stdout = process.stdout.expect("failed to get stdout handle");
    let stderr = process.stderr.expect("failed to get stderr handle");
    let mut err_lol = String::new();
    let stdout_reader = BufReader::new(stdout);
    let stderr_reader = BufReader::new(stderr);

    for line in stdout_reader.lines() {
        let line = line?;
        println!(
            "[stdout] {}",
            str::from_utf8(&strip_ansi_escapes::strip(line).expect("Error to remove color"))
                .unwrap()
                .replace('"', " ")
        );
    }

    for line in stderr_reader.lines() {
        let line = line?;
        println!(
            "[stderr] {}",
            str::from_utf8(&strip_ansi_escapes::strip(line).expect("Error to remove color"))
                .unwrap()
                .replace('"', "")
        );
    }
    let ten_millis = time::Duration::from_millis(2000);
    thread::sleep(ten_millis);
    std::io::stdin().read_line(&mut err_lol).unwrap();
    let _ = Command::new("pause").status();
    Ok(())
}
