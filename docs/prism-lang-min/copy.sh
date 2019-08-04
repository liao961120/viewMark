for filename in ../prism-langs/*.min.js; do
    echo ${filename} >> files.txt
    cp ${filename} .
done
