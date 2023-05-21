import json
from flask import Flask, render_template
import subprocess
import json
import subprocess

app = Flask(__name__, template_folder='../front-end', static_folder='../front-end/static')

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/caption/<video_id>', methods=['GET'])
def getCaption(video_id):
    data_file = "anet_data.json"
    output_file = "data.json"

    with open(data_file) as f:
        data = json.load(f)
    if video_id in data:
        video_data = {video_id: data[video_id]}
        with open(output_file, 'w') as f:
            json.dump(video_data, f, indent=4)
    else:
        print("Video ID not found in the JSON data.")

    p = subprocess.run(['./translate.sh'])
    if p.returncode == 0:
        with open('results/results.json') as f:
            data = json.load(f)

        if "results" in data:
                results = data["results"]
                extracted_data = results[video_id]
                response = json.dumps(extracted_data, indent=4)
                return response
        else:
            return {}
        
@app.route('/video_ids', methods=['GET'])
def getVideoIds():
    data_file = "anet_data.json"

    with open(data_file) as f:
        data = json.load(f)

    video_ids = list(data.keys())

    response = {"video_ids": video_ids}
    return json.dumps(response)

if __name__ == '__main__':
    app.run(debug=True)
