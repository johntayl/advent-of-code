fn main() {
    let input = include_str!("input.txt");

    let mut elves = Vec::new();
    let mut current_elf = 0;
    let mut top_elf = 0;

    // loop over lines.
    for line in input.lines() {
        // empty line, end this elf calorie count
        if line.len() == 0 {
            elves.push(current_elf);
            if current_elf > top_elf {
                top_elf = current_elf;
            }
            current_elf = 0;
            continue;
        }

        if let Ok(elf_count) = line.parse::<u32>() {
            // sum up the calories
            current_elf += elf_count;
        }
    }

    // part 1, top elf
    println!("Top elf: {}", top_elf);

    // part 2, top 3 elves.
    elves.sort();
    let length = elves.len();
    let first = elves[length - 1];
    let second = elves[length - 2];
    let third = elves[length - 3];

    println!("top 3: {}", first + second + third);
}
