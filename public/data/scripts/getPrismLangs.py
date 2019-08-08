import re
import json

out = []
with open('supported.txt') as f:
    for line in f:
        matched = re.search('../prism-langs/prism-([a-zA-Z0-9-]+?)\.min\.js', line)
        if matched:
            print(matched.group(1))
            out.append(matched.group(1))

with open('../supportLangs.json', 'w') as f:
    json.dump(out, f)