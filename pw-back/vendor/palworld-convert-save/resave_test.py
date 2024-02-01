#!/usr/bin/env python3
# This scripts takes a .sav file as input, and runs through the sav > JSON > sav process to ensure that the output is the same as the input.
import sys

from convert import convert_json_to_sav, convert_sav_to_json
from lib.palsav import decompress_sav_to_gvas


def main():
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <input>")
        sys.exit(1)
    input_path = sys.argv[1]
    print(f"Testing if {input_path} is the same after resaving...")
    output_json_path = input_path + ".resave.json"
    output_sav_path = input_path + ".resave.sav"
    convert_sav_to_json(input_path, output_json_path, True)
    convert_json_to_sav(output_json_path, output_sav_path)
    print(f"Comparing {input_path} and {output_sav_path}...")
    with open(input_path, "rb") as f:
        input_bytes = f.read()
        original_gvas = decompress_sav_to_gvas(input_bytes)
    with open(output_sav_path, "rb") as f:
        output_bytes = f.read()
        resaved_gvas = decompress_sav_to_gvas(output_bytes)
    if original_gvas == resaved_gvas:
        print("Files are the same!")
    else:
        print("Files are different!")
        sys.exit(1)


if __name__ == "__main__":
    main()
