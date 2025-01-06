import json
weapons = list()
with open('weapons.csv', 'r', ) as file:
    # Read each line in the file
    for line in file:
        # Print each line
        splitted_line = line.strip().split(";")
        weapon = {
            "name": splitted_line[0].encode('ascii', errors='ignore').strip().decode('ascii'),
            "cost": splitted_line[3],
            "type": None,
            "damage": splitted_line[1],
            "hit rate": splitted_line[2],
            "found": None,
            "store": None,
            "spell": splitted_line[4] if splitted_line[4] else None,
            "equiped by": splitted_line[5]
        }
        weapons.append(weapon)

print(json.dumps(weapons))
