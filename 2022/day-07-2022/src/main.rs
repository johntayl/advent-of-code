use std::collections::HashMap;
use std::time::Instant;

struct OS {
    directories: HashMap<String, u64>,
}

fn main() {
    let mut input = include_str!("input.txt");
    input = input.trim_end();

    let now = Instant::now();

    let mut os = OS {
        directories: HashMap::new(),
    };

    let mut fs_path: Vec<&str> = Vec::new();

    for line in input.lines() {
        let parts = line.split(" ").collect::<Vec<&str>>();
        let prefix = parts[0];
        let name = parts[1];

        if prefix == "$" {
            if name == "cd" {
                let target = parts[2];
                if target == "/" {
                    fs_path = Vec::new();
                    continue;
                } else if target == ".." {
                    fs_path.pop();
                    continue;
                } else {
                    fs_path.push(target);
                    continue;
                }
            }
            // ignore ls
            continue;
        }

        // join the path and the name.
        let path_key = build_path_key(fs_path.clone());
        if !os.directories.contains_key(path_key.as_str()) {
            os.directories.insert(path_key.to_string(), 0);
        }

        // skip directories.
        if prefix == "dir" {
            continue;
        }

        let file_size = prefix.parse::<u64>().unwrap();

        let current_dir_size = os.directories.get(path_key.as_str()).unwrap();

        os.directories
            .insert(path_key.to_string(), *current_dir_size + file_size);

        // iterate backwards through path and update the parent.
        let mut parent_path = Vec::from(fs_path.clone());
        while parent_path.len() >= 1 {
            parent_path.pop();
            let parent_path_key = build_path_key(parent_path.clone());
            let parent_size = os.directories.get(parent_path_key.as_str()).unwrap();
            os.directories
                .insert(parent_path_key.to_string(), *parent_size + file_size);
        }
    }

    let mut total_size = 0;
    let total_space = 70000000;
    let space_required = 30000000;
    let used_space = os.directories.get(String::from("/").as_str()).unwrap();
    let space_left = total_space - *used_space;
    let space_to_delete = space_required - space_left;
    let mut smallest_size = total_space;

    for (_, size) in &os.directories {
        if *size <= 100000 {
            // println!("{}: {}", p, size);
            total_size += size;
        }
    }

    for (_, size) in &os.directories {
        if *size >= space_to_delete && *size < smallest_size {
            smallest_size = *size;
        }
    }

    println!("Total size: {}", total_size);
    println!("smallest size: {}", smallest_size);

    println!("time: {}ms", now.elapsed().as_millis());
}

fn build_path_key(path: Vec<&str>) -> String {
    let mut path_key = String::from("/");
    path_key.push_str(path.join("/").as_str());
    return path_key;
}
