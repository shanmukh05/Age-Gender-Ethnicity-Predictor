from __future__ import division, print_function

import os
import numpy as np
import tensorflow as tf
from flask import Flask,request, render_template
from werkzeug.utils import secure_filename


app = Flask(__name__)

model = tf.keras.models.load_model("mobilenet_model.h5")

gender_dict={
    0:"Male",
    1:"Female"
}

ethnicity_dict = {
  0:"White",
  1:"Black",
  2:"Asian",
  3:"Indian",
  4:"Others"
}
UPLOAD_FOLDER = os.path.join(os.getcwd(),"uploads")
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def predict_ase(img_path,model):
    img = tf.keras.preprocessing.image.load_img(img_path,target_size=(200,200))
    img = tf.keras.preprocessing.image.img_to_array(img)
    img = np.expand_dims(img,0)
    pred = model.predict(img)
    age = np.argmax(pred[0][:12])
    gender = gender_dict[np.argmax(pred[0][12:14])]
    ethnicity = ethnicity_dict[np.argmax(pred[0][14:])]
    text = f"The person in below image is {gender}, his ethncity is {ethnicity} and has age between {age*10} and {age*10+10}"
    return text
    


@app.route("/",methods=["GET"])
def index():
    return render_template('index.html')

@app.route('/predict',methods=["GET","POST"])
def upload():
    if request.method == "POST":
        f = request.files["fileup"]
        #basepath = os.path.dirname(__file__)
        filename = secure_filename(f.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'],filename)
        f.save(filepath)
        
        result = predict_ase(filepath,model)
        return result
    return None


if __name__ == '__main__':
    app.run(debug=True)