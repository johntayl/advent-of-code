use std::{collections::HashMap};

fn split_string_half(string: &str) -> (String, String) {
    let half = string.len() / 2;
    let (first, second) = string.split_at(half);
    return (first.to_string(), second.to_string())
}

fn get_priority(letters: &str, letter: char) -> usize {
    let mut priority = 1;
    for l in letters.chars() {
        if l == letter {
            return priority;
        }
        priority += 1;
    }
    return priority;
}

fn find_match_char(first: &str, second: &str) -> Option<char> {
    for c in first.chars() {
        if second.contains(c) {
            return Some(c);
        }
    }
    return None;
}


fn main() {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let input = include_str!("input.txt");

    let mut total_score = 0;
    let mut total_score_2 = 0;

    // part 2
    // every 3 lines is a group
    let mut group_chars: HashMap<char, Vec<i32>> = HashMap::new();
    let mut current_group_count = 0;

    // part 1
    for line in input.lines() {
        let (first, second) = split_string_half(line);
        let matching_char = find_match_char(&first, &second);
        if let Some(match_char) =  matching_char {
            let priority = get_priority(letters, match_char);
            total_score += priority;
        }

        // part 2
        if current_group_count == 3  {
            // on to final line, do priority calc and clear
            for (key, value) in &group_chars {
                if value.len() == 3 { 
                    total_score_2 += get_priority(letters, *key);
                }
            }
            group_chars.clear();
            current_group_count = 0;
        }

        current_group_count += 1;

        for c in line.chars() {
            // count once per line
            if !group_chars.contains_key(&c) {
                group_chars.insert(c, vec![current_group_count]);
            } else {
                // push current group if not already in
                let group_vec = group_chars.get_mut(&c).unwrap();
                if !group_vec.contains(&current_group_count) {
                    group_vec.push(current_group_count);
                }                
            }
        }
    }

    // final group, need to get priority one last time.
    for (key, value) in &group_chars {
        if value.len() == 3 { // .
            total_score_2 += get_priority(letters, *key);
        }
    }

    // part 1
    println!("Score: {}", total_score);

    // part 2
    println!("Score 2: {}", total_score_2);
}
