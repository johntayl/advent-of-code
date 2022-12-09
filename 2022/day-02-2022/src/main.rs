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

    let win = 6;
    let draw = 3;

    let mut shape_map = HashMap::new();
    shape_map.insert("A", rock);
    shape_map.insert("B", paper);
    shape_map.insert("C", scissors);

    shape_map.insert("X", rock);
    shape_map.insert("Y", paper);
    shape_map.insert("Z", scissors);

    let a_shape_match = shape_map.get(a);
    let b_shape_match = shape_map.get(b);

    let mut a_shape = 0;
    let mut b_shape = 0;

    match a_shape_match {
        Some(&v) => {
            a_shape = v;
        }
        None => {}
    }

    match b_shape_match {
        Some(&v) => {
            b_shape = v;
        }
        None => {}
    }

    if a_shape == b_shape {
        // draw
        return b_shape + draw;
    }

    // lose conditions
    if (a_shape == rock && b_shape == scissors)
        || (a_shape == paper && b_shape == rock)
        || (a_shape == scissors && b_shape == paper)
    {
        // lose
        return b_shape;
    }

    // win conditions
    if (b_shape == rock && a_shape == scissors)
        || (b_shape == paper && a_shape == rock)
        || (b_shape == scissors && a_shape == paper)
    {
        return b_shape + win;
    }

    return 0;
}

fn strategy(a: &str, b: &str) -> usize {
    // X = lose
    // Y = draw
    // Z = win
    let rock = 1;
    let paper = 2;
    let scissors = 3;

    let win = 6;
    let draw = 3;

    let mut shape_map = HashMap::new();
    shape_map.insert("A", rock);
    shape_map.insert("B", paper);
    shape_map.insert("C", scissors);

    shape_map.insert("X", rock);
    shape_map.insert("Y", paper);
    shape_map.insert("Z", scissors);

    let a_shape_match = shape_map.get(a);

    let mut a_shape = 0;

    match a_shape_match {
        Some(&v) => {
            a_shape = v;
        }
        None => {}
    }

    let v = shape_map.get(a);

    if b == "X" {
        // lose
        if a_shape == rock {
            return scissors;
        }

        if a_shape == paper {
            return rock;
        }

        if a_shape == scissors {
            return paper;
        }
    }

    if b == "Y" {
        // draw
        return a_shape + draw;
    }

    if b == "Z" {
        // win
        if a_shape == rock {
            return paper + win;
        }

        if a_shape == paper {
            return scissors + win;
        }

        if a_shape == scissors {
            return rock + win;
        }
    }

    return 0;
}
