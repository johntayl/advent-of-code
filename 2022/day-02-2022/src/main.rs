use std::collections::HashMap;

fn main() {
    // A, B, C = rock, paper, scissors
    // X, Y, Z = rock, paper, scissors
    let input = include_str!("input.txt");
    let games = input
        .lines()
        .map(|line| return line.split_whitespace().collect::<Vec<&str>>())
        .collect::<Vec<Vec<&str>>>();

    let mut total_score_1 = 0;
    let mut total_score_2 = 0;

    for game in games {
        total_score_1 += score(&game[0], &game[1]);
        total_score_2 += strategy(&game[0], &game[1]);
    }

    // part 1
    println!("Score 1: {:?}", total_score_1);
    // part 2
    println!("Score 2: {:?}", total_score_2);
}

fn score(a: &str, b: &str) -> usize {
    let rock = 1;
    let paper = 2;
    let scissors = 3;

    let lose = 0;
    let win = 6;
    let draw = 3;

    let mut outcome_map = HashMap::new();
    outcome_map.insert("A X", rock + draw);
    outcome_map.insert("A Y", paper + win);
    outcome_map.insert("A Z", scissors + lose);

    outcome_map.insert("B X", rock + lose);
    outcome_map.insert("B Y", paper + draw);
    outcome_map.insert("B Z", scissors + win);

    outcome_map.insert("C X", rock + win);
    outcome_map.insert("C Y", paper + lose);
    outcome_map.insert("C Z", scissors + draw);

    let key = format!("{} {}", a, b);

    let score = outcome_map.get(key.as_str()).unwrap();

    return *score;
}

fn strategy(a: &str, b: &str) -> usize {
    // X = lose
    // Y = draw
    // Z = win
    let rock = 1;
    let paper = 2;
    let scissors = 3;

    let lose = 0;
    let win = 6;
    let draw = 3;

    let mut outcome_map = HashMap::new();
    outcome_map.insert("A X", scissors + lose);
    outcome_map.insert("A Y", rock + draw);
    outcome_map.insert("A Z", paper + win);

    outcome_map.insert("B X", rock + lose);
    outcome_map.insert("B Y", paper + draw);
    outcome_map.insert("B Z", scissors + win);

    outcome_map.insert("C X", paper + lose);
    outcome_map.insert("C Y", scissors + draw);
    outcome_map.insert("C Z", rock + win);

    let key = format!("{} {}", a, b);

    let score = outcome_map.get(key.as_str()).unwrap();

    return *score;
}
