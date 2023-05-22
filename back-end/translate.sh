#!/usr/bin/env bash

export DIR_PWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PYTHONPATH="$PYTHONPATH:$DIR_PWD"

if [ -d "${DIR_PWD}/results" ]; then
    rm -rf "${DIR_PWD}/results/"
fi

mkdir "${DIR_PWD}/results/"

res_dir="model"
split_name="test"
data_path="data.json"
out_dir="${DIR_PWD}/results"
output="results.json"

python3 src/translate.py \
--no_cuda \
--res_dir=${res_dir} \
--eval_splits=${split_name} \
--data_path=${data_path} \
--out_dir=${out_dir} \
--output=${output} \
${@:6}
