import json

out_string = ''
with open('../print.css') as f:
    for line in f:
        out_string += line

with open('../print.css.json', 'w') as f:
    json.dump(out_string, f)