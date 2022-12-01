const path = require("path");
const { readLines } = require("../utils/file");
const {
  array2d,
  print2d,
  sum,
  mapValue,
  inBounds,
  coordsToArray,
  coordsToStr,
  chunk,
  multiply
} = require("../utils/array");
const Numbers = require("../utils/numbers");
const { add } = require("../utils/vector");
// const filename = "./test.txt";
const filename = "./input.txt";

function implementation(lines) {
  return JSON.stringify(
    parsePacket(
      parseHex(
        "00569F4A0488043262D30B333FCE6938EC5E5228F2C78A017CD78C269921249F2C69256C559CC01083BA00A4C5730FF12A56B1C49A480283C0055A532CF2996197653005FC01093BC4CE6F5AE49E27A7532200AB25A653800A8CAE5DE572EC40080CD26CA01CAD578803CBB004E67C573F000958CAF5FC6D59BC8803D1967E0953C68401034A24CB3ACD934E311004C5A00A4AB9CAE99E52648401F5CC4E91B6C76801F59DA63C1F3B4C78298014F91BCA1BAA9CBA99006093BFF916802923D8CC7A7A09CA010CD62DF8C2439332A58BA1E495A5B8FA846C00814A511A0B9004C52F9EF41EC0128BF306E4021FD005CD23E8D7F393F48FA35FCE4F53191920096674F66D1215C98C49850803A600D4468790748010F8430A60E1002150B20C4273005F8012D95EC09E2A4E4AF7041004A7F2FB3FCDFA93E4578C0099C52201166C01600042E1444F8FA00087C178AF15E179802F377EC695C6B7213F005267E3D33F189ABD2B46B30042655F0035300042A0F47B87A200EC1E84306C801819B45917F9B29700AA66BDC7656A0C49DB7CAEF726C9CEC71EC5F8BB2F2F37C9C743A600A442B004A7D2279125B73127009218C97A73C4D1E6EF64A9EFDE5AF4241F3FA94278E0D9005A32D9C0DD002AB2B7C69B23CCF5B6C280094CE12CDD4D0803CF9F96D1F4012929DA895290FF6F5E2A9009F33D796063803551006E3941A8340008743B8D90ACC015C00DDC0010B873052320002130563A4359CF968000B10258024C8DF2783F9AD6356FB6280312EBB394AC6FE9014AF2F8C381008CB600880021B0AA28463100762FC1983122D2A005CBD11A4F7B9DADFD110805B2E012B1F4249129DA184768912D90B2013A4001098391661E8803D05612C731007216C768566007280126005101656E0062013D64049F10111E6006100E90E004100C1620048009900020E0006DA0015C000418000AF80015B3D938"
      ).split(""),
      true
    ),
    null,
    2
  );
}

function parseHex(hexLine) {
  // convert hex to binary string
  let hexes = chunk(hexLine.split(""), 2);
  let lineBinary = hexes.map((hex) => Numbers.hex2bin(hex.join(""))).join("");

  return lineBinary;
}

function parsePacket(bin) {
  let packets = [];

  // first 3 packet version
  let version = bin.splice(0, 3).join("");
  // next 3 type ID
  let typeId = Numbers.bin2int(bin.splice(0, 3).join(""));

  // is this possible to splice more?
  if (bin.length < 5) {
    // Invalid headers length.
    return packets;
  }

  // packet ID 4 = literal value
  if (typeId == 4) {
    // groups prefixed by 1 = 10111
    let groups = chunk(bin, 5);
    let literals = [];

    for (let i = 0; i < groups.length; i++) {
      // splice this group off the bin
      bin.splice(0, 5);
      const group = groups[i];
      let groupPointer = group.splice(0, 1)[0];

      // literals.
      literals.push(group.join(""));

      // last group prefixed by 0 = 01111
      if (groupPointer == "0") {
        // last group
        break;
      }
      // rest ignore
    }

    packets.push({
      packetType: "Literal",
      version: Numbers.bin2int(version),
      typeId: typeId,
      literals: literals.join(""),
      value: Numbers.bin2int(literals.join(""))
    });

    return packets;
  } else {
    // other ID = operator 1 or more packets
    // after packet header (first 6), length type ID
    let lengthType = bin.splice(0, 1);
    let packetBits = null;
    let totalPackets = 0;
    let subpackets = [];

    if (lengthType == "0") {
      // 0 length type id = next 15 bits is number of total
      // length of bits in sub packets (unknown length of sub packets)
      packetBits = Numbers.bin2int(bin.splice(0, 15).join(""));
    } else {
      // 1 length type id = next 11 bits is number of total
      // number of sub packets.
      totalPackets = Numbers.bin2int(bin.splice(0, 11).join(""));
    }

    // sub packets appear
    let morePackets = true;

    let operators = {
      0: "sum",
      1: "product",
      2: "min",
      3: "max",
      5: "gt",
      6: "lt",
      7: "eq"
    };

    let newPacket = {
      packetType: "Operator",
      version: Numbers.bin2int(version),
      typeId: typeId,
      operator: operators[typeId],
      subpackets: [],
      bitSize: packetBits,
      totalPackets,
      value: null
    };

    let bitsRemaining = bin.length;

    while (morePackets) {
      let bitsProcessed = bitsRemaining - bin.length;
      if (lengthType == "0" && bitsProcessed === packetBits) {
        // Have we parsed packetBits yet.
        morePackets = false;
        continue;
      } else if (
        totalPackets > 0 &&
        newPacket.subpackets.length == totalPackets
      ) {
        morePackets = false;
        continue;
      }

      subpackets = parsePacket(bin);

      if (subpackets.length == 0) {
        morePackets = false;
      }

      newPacket.subpackets = [...newPacket.subpackets, ...subpackets];
    }

    if (typeId == 0) {
      // sum of all sub packets.
      newPacket.operator = "sum";
      newPacket.value = sum(newPacket.subpackets.map((pack) => pack.value));
    } else if (typeId == 1) {
      // product.
      newPacket.operator = "product";
      newPacket.value = multiply(
        newPacket.subpackets.map((pack) => pack.value)
      );
    } else if (typeId == 2) {
      // min
      newPacket.operator = "min";
      newPacket.value = Math.min(
        ...newPacket.subpackets.map((pack) => pack.value)
      );
    } else if (typeId == 3) {
      // max
      newPacket.operator = "max";
      newPacket.value = Math.max(
        ...newPacket.subpackets.map((pack) => pack.value)
      );
    } else if (typeId == 5) {
      // greater than
      newPacket.operator = "gt";
      newPacket.value =
        newPacket.subpackets[0].value > newPacket.subpackets[1].value ? 1 : 0;
    } else if (typeId == 6) {
      // less than
      newPacket.operator = "lt";
      newPacket.value =
        newPacket.subpackets[0].value < newPacket.subpackets[1].value ? 1 : 0;
    } else if (typeId == 7) {
      // less than
      newPacket.operator = "eq";
      newPacket.value =
        newPacket.subpackets[0].value == newPacket.subpackets[1].value ? 1 : 0;
    }

    packets.push(newPacket);

    return packets;
  }

  // Can't parse anymore.
  return packets;
}

function main() {
  console.time("speed");
  const result = implementation(readLines(path.resolve(__dirname, filename)));
  console.timeEnd("speed");

  console.log(result);
}

main();
