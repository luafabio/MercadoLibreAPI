#!/bin/bash
set -B                  # enable brace expansion
for i in {1..3652}; do
  curl -k 'GET' 'http://localhost:3000/clima?dias='$i >> ./Docs/data.txt
  echo -e "\n" >> hola.txt
done