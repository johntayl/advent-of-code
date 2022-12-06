use std::time::Instant;

fn main() {
    // test stack starting point

    // let mut cargo_stack = build_test_stack();
    // let mut input = include_str!("input.test");

    let mut cargo_stack = build_prod_stack();
    let mut input = include_str!("input.txt");

    // time execution
    let now = Instant::now();

    input = input.trim_end();

    input
        .split("\n")
        .map(|line| {
            // move_command(line, &mut cargo_stack);
            move_group_command(line, &mut cargo_stack);
        })
        .for_each(drop);

    // print top of stacks
    cargo_stack.iter().for_each(|stack| {
        print!("{}", stack.last().unwrap());
    });
    println!("");

    println!("time: {}µs", now.elapsed().as_micros());
}

// part 1
#[allow(dead_code)]
fn move_command<'a>(command: &'a str, stack: &'a mut Vec<Vec<char>>) -> &'a Vec<Vec<char>> {
    let command_parts = command.split(" ").collect::<Vec<&str>>();
    if command_parts.len() >= 5 {
        let quantity = command_parts[1];
        let from = command_parts[3];
        let to = command_parts[5];

        // part 1 move one at a time.
        for _ in 0..quantity.parse::<usize>().unwrap() {
            // pop from stack
            let from_stack_index = from.parse::<usize>().unwrap() - 1;
            let to_stack_index = to.parse::<usize>().unwrap() - 1;
            let from_stack = stack[from_stack_index].pop().unwrap();

            stack[to_stack_index].push(from_stack);
        }

        return stack;
    }

    return stack;
}

// part 2
fn move_group_command<'a>(command: &'a str, stack: &'a mut Vec<Vec<char>>) -> &'a Vec<Vec<char>> {
    let command_parts = command.split(" ").collect::<Vec<&str>>();
    if command_parts.len() >= 5 {
        let quantity = command_parts[1];
        let from = command_parts[3];
        let to = command_parts[5];

        // slice quantity from stack
        let from_stack_index = from.parse::<usize>().unwrap() - 1;
        let to_stack_index = to.parse::<usize>().unwrap() - 1;
        let split_amount = stack[from_stack_index].len() - quantity.parse::<usize>().unwrap();
        let mut from_stack = stack[from_stack_index].split_off(split_amount);

        // append to stack
        stack[to_stack_index].append(&mut from_stack);

        return stack;
    }

    return stack;
}

#[allow(dead_code)]
fn build_test_stack() -> Vec<Vec<char>> {
    // build the base stacks
    let mut stack1: Vec<Vec<char>> = Vec::new();

    stack1.push(vec!['Z', 'N']);
    stack1.push(vec!['M', 'C', 'D']);
    stack1.push(vec!['P']);

    return stack1;
}

fn build_prod_stack() -> Vec<Vec<char>> {
    // build the base stacks
    let mut stack1: Vec<Vec<char>> = Vec::new();

    stack1.push(vec!['S', 'C', 'V', 'N']);
    stack1.push(vec!['Z', 'M', 'J', 'H', 'N', 'S']);
    stack1.push(vec!['M', 'C', 'T', 'G', 'J', 'N', 'D']);
    stack1.push(vec!['T', 'D', 'F', 'J', 'W', 'R', 'M']);
    stack1.push(vec!['P', 'F', 'H']);
    stack1.push(vec!['C', 'T', 'Z', 'H', 'J']);
    stack1.push(vec!['D', 'P', 'R', 'Q', 'F', 'S', 'L', 'Z']);
    stack1.push(vec!['C', 'S', 'L', 'H', 'D', 'F', 'P', 'W']);
    stack1.push(vec!['D', 'S', 'M', 'P', 'F', 'N', 'G', 'Z']);

    return stack1;
}
