fn main() {
    let input = include_str!("input.txt");

    let input = input.trim_end();
    let mut total_within = 0;
    let mut total_overlapped = 0;

    let pairs = input
        .split("\n")
        .map(|line| {
            return line
                .split(",")
                .map(|x| {
                    return x
                        .split("-")
                        .map(|x| {
                            return x.parse::<u32>().unwrap();
                        })
                        .collect::<Vec<u32>>();
                })
                .collect::<Vec<Vec<u32>>>();
        })
        .collect::<Vec<Vec<Vec<u32>>>>();

    for pair in pairs {
        // part 1
        if check_within(pair[0][0], pair[0][1], pair[1][0], pair[1][1]) {
            total_within += 1;
        }

        // part 2
        if check_overlap(pair[0][0], pair[0][1], pair[1][0], pair[1][1]) {
            total_overlapped += 1;
        }
    }

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
