use std::{collections::HashMap, time::Instant};

#[derive(Debug)]
struct Vec3 {
    x: i32,
    y: i32,
    z: i32,
}

impl Vec3 {
    fn new(x: i32, y: i32, z: i32) -> Self {
        Self { x, y, z }
    }

    fn add_mutable(&mut self, other: &Vec3) {
        self.x += other.x;
        self.y += other.y;
        self.z += other.z;
    }

    fn clone(&self) -> Vec3 {
        Vec3::new(self.x, self.y, self.z)
    }
}

fn main() {
    let mut input = include_str!("input.txt");
    input = input.trim_end();

    let now = Instant::now();

    let mut visited_tail_positions: HashMap<String, bool> = HashMap::new();
    let mut visited_tail_positions_2: HashMap<String, bool> = HashMap::new();

    let mut rope: Vec<Vec3> = Vec::new();
    for _ in 0..10 {
        rope.push(Vec3::new(0, 0, 0));
    }

    // mark the starting position as visited
    visited_tail_positions.insert(vec_key(&rope[1]).to_string(), true);
    visited_tail_positions_2.insert(vec_key(&rope[rope.len() - 1]).to_string(), true);

    for line in input.lines() {
        for command in line.split(",") {
            let parts = command.split(" ").collect::<Vec<&str>>();
            let walk_distance = parts[1].parse::<i32>().unwrap();
            let move_vec = parse_direction(&parts[0]);

            // part 1
            for _ in 0..walk_distance {
                // mark the last head position, and update the head position
                rope[0].add_mutable(&move_vec);

                // move the rest of the knots
                for i in 1..rope.len() {
                    // check if current knot has to move
                    let knot_1 = rope[i - 1].clone();
                    let knot_2 = &mut rope[i];

                    // check distance from knot_1 to knot_2 by x
                    if (knot_1.x - knot_2.x).abs() > 1 || (knot_1.y - knot_2.y).abs() > 1 {
                        let mut move_x = 0;
                        let mut move_y = 0;
                        if knot_1.x != knot_2.x {
                            move_x = if knot_1.x - knot_2.x > 0 { 1 } else { 1 };
                        }

                        if knot_1.y != knot_2.y {
                            move_y = if knot_1.y - knot_2.y > 0 { 1 } else { -1 };
                        }

                        knot_2.add_mutable(&Vec3::new(move_x, move_y, 0));
                    }
                }

                visited_tail_positions.insert(vec_key(&rope[1]).to_string(), true);
                visited_tail_positions_2.insert(vec_key(&rope[rope.len() - 1]).to_string(), true);
            }
        }
    }

    println!("visited tail positions: {:?}", visited_tail_positions.len());
    println!(
        "visited tail positions 2: {:?}",
        visited_tail_positions_2.len()
    );

    println!("time: {}ms", now.elapsed().as_millis());
}

fn parse_direction(direction: &str) -> Vec3 {
    // create vec3 from direction and distance
    match direction {
        "U" => Vec3::new(0, 1, 0),
        "R" => Vec3::new(1, 0, 0),
        "D" => Vec3::new(0, -1, 0),
        "L" => Vec3::new(-1, 0, 0),
        _ => panic!("unknown direction"),
    }
}

fn vec_key(vec: &Vec3) -> String {
    format!("{}-{}", vec.x, vec.y)
}
