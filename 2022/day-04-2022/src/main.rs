fn main() {
    let input = include_str!("input.txt");

    let input = input.trim_end();
    let mut total_within = 0;
    let mut total_overlapped = 0;

    input
        .split("\n")
        .map(|line| {
            // split out to pairs.
            let pairs = line
                .split(",")
                .map(|x| {
                    x.split("-")
                        .map(|x| x.parse::<u32>().unwrap())
                        .collect::<Vec<u32>>()
                })
                .collect::<Vec<Vec<u32>>>();

            // part 1
            if check_within(pairs[0][0], pairs[0][1], pairs[1][0], pairs[1][1]) {
                total_within += 1;
            }

            // part 2
            if check_overlap(pairs[0][0], pairs[0][1], pairs[1][0], pairs[1][1]) {
                total_overlapped += 1;
            }
            return pairs;
        })
        .for_each(drop); // drop what is consumed from iterator.

    println!("total_within: {}", total_within);
    println!("total_overlapped: {}", total_overlapped);
}

fn check_within(min1: u32, max1: u32, min2: u32, max2: u32) -> bool {
    (min1 <= min2 && max1 >= max2) || (min2 <= min1 && max2 >= max1)
}

fn check_overlap(min1: u32, max1: u32, min2: u32, max2: u32) -> bool {
    (min1 <= min2 && max1 >= min2)
        || (min1 <= max2 && max1 >= max2)
        || (min2 <= min1 && max2 >= min1)
        || (min2 <= max1 && max2 >= max1)
}
