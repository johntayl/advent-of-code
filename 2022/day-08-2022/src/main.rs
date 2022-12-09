use std::time::Instant;

fn main() {
    let mut input = include_str!("input.txt");
    input = input.trim_end();

    let now = Instant::now();

    let mut forest_map: Vec<Vec<usize>> = Vec::new();
    let mut max_score = 0;
    let mut visible_count = 0;

    for line in input.lines() {
        let mut row = line.split("").collect::<Vec<&str>>();
        row.remove(0);
        row.pop();

        let row = row
            .into_iter()
            .map(|c| c.parse::<usize>().unwrap())
            .collect::<Vec<usize>>();
        forest_map.push(row);
    }

    for y in 0..forest_map.len() {
        let row = &forest_map[y];

        for x in 0..forest_map[y].len() {
            // get the column at x
            let col = forest_map.iter().map(|r| r[x]).collect::<Vec<usize>>();
            let tree = forest_map[y][x];

            //get the row from the left without x
            let mut left_row: Vec<usize> = Vec::new();
            row[0..x].clone_into(&mut left_row);

            // reverse the left row
            left_row.reverse();

            let mut right_row: Vec<usize> = Vec::new();
            row[x + 1..].clone_into(&mut right_row);

            let mut up_col: Vec<usize> = Vec::new();
            col[0..y].clone_into(&mut up_col);

            // reverse the up col
            up_col.reverse();

            let mut down_col: Vec<usize> = Vec::new();
            col[y + 1..].clone_into(&mut down_col);

            let rows = vec![&left_row, &right_row, &up_col, &down_col];

            // part 1
            if check_tree_visibility(tree, &rows) {
                visible_count += 1;
            }

            // part 2
            let scenic_score = check_tree_score(tree, &rows);

            if scenic_score > max_score {
                max_score = scenic_score;
            }
        }
    }
    println!("visible_count: {}", visible_count);
    println!("max_score: {}", max_score);

    println!("time: {}ms", now.elapsed().as_millis());
}

fn check_tree_visibility(tree: usize, rows: &Vec<&Vec<usize>>) -> bool {
    let mut is_visible = false;

    for row in rows {
        if row.len() == 0 {
            is_visible = true;
            continue;
        }

        let largest = row.iter().max().unwrap();

        if tree > *largest {
            is_visible = true;
        }
    }

    return is_visible;
}

fn check_tree_score(tree: usize, lines: &Vec<&Vec<usize>>) -> usize {
    let mut scores: Vec<usize> = Vec::new();

    for line in lines {
        let mut tree_score = 0;

        for i in 0..line.len() {
            let t = &line[i];
            tree_score += 1;

            if tree <= *t {
                break;
            }
        }

        scores.push(tree_score);
    }

    let mut score = 1;
    for s in scores {
        score *= s;
    }

    return score;
}
