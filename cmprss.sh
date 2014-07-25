#!/bin/sh
java -jar ~/Desktop/trash/compiler-latest/compiler.jar --js compressor.js --js_output_file compressor.min.js
echo "compile compressor.js"
java -jar ~/Desktop/trash/compiler-latest/compiler.jar --js snowball.js --js_output_file snowball.min.js
echo "compile snowball.js"
java -jar ~/Desktop/trash/compiler-latest/compiler.jar --js cssblock.js --js_output_file cssblock.min.js
echo "compile cssblock.js"
gzip -c9 compressor.min.js>compressor.min.js.gz
echo "gzip compressor.js"
gzip -c9 snowball.min.js>snowball.min.js.gz
echo "gzip snowball.js"
gzip -c9 cssblock.min.js>cssblock.min.js.gz
echo "gzip cssblock.js"
