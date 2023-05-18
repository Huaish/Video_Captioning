from flask import Flask, render_template
import subprocess

app = Flask(__name__, template_folder='../front-end', static_folder='../front-end/static')

@app.route('/')
def index():
    return render_template("index.html")

# @app.route('/get_caption')
def get_caption():
    # run translate.sh to get caption and wait for it to finish
    p = subprocess.run(['./translate.sh'])
    print(p)
    # read caption from caption.txt
    with open('results/result.json', 'r') as f:
        caption = f.readlines()
        print(caption)





    


if __name__ == '__main__':
    # app.run(debug=True)
    get_caption()