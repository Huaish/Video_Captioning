#!/usr/bin/env bash

rm ${HOME}/VLCAP/results/*
export DIR_PWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
res_dir="model"
split_name="test"
data_path="${DIR_PWD}/data.json"
out_dir="${DIR_PWD}/results"
output="results.json"

cd ${HOME}/VLCAP && source ./setup.sh && python src/translate.py \
--res_dir=results/${res_dir} \
--eval_splits=${split_name} \
--data_path=${data_path} \
--out_dir=${out_dir} \
--output=${output} \
${@:6}
