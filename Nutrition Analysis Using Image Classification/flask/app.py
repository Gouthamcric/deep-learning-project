from __future__ import division, print_function

import os


import numpy as np
from keras.models import load_model
from keras.preprocessing import image
from flask import Flask, url_for, request, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer

global model,graph
import tensorflow as tf
graph = tf.get_default_graph()

app = Flask(__name__)



model = load_model('models/fruit_predict.h5')



def model_predict(img_path, model):
    img = image.load_img(img_path, target_size=(64, 64))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    preds = model.predict_classes(x)
    return preds


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        f = request.files['file']

        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        preds = model_predict(file_path, model)
        ls=["Apple","Banana","Mango","Orange"]
        result = ls[preds[0]]             
        return result
    return None


if __name__ == '__main__':

    http_server = WSGIServer(('0.0.0.0', 5000), app)
    http_server.serve_forever()
