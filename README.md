# Age-Gender-Ethnicity-Predictor
Predicts age,gender,ethnicty of image of person uploaded

# [Go to the app to test :)](https://aseprediction.herokuapp.com/)
**may take few minutes to load**

<img src="https://github.com/shanmukh05/Age-Gender-Ethnicity-Predictor/blob/main/images/demo.png" width="600" height = "350">

### zoom-out to 75% on PC for better experience.

# Details of Files present in Repository
- ### images
    - contains images needed for frontend
- ### static
    - css
       - contains **CSS** files
    - js
       - contains **Java script** files
 - ### templates
     - contains **HTML** files 
 - ### uploads
     - image uploaded during prediction are temporarily stored in this folder. **Make sure this folder is not empty during deployment, as git will not track empty folders**.
 - #### app.py : python file
 - #### mobilenet_model.zip : pretrained model (lucky that the compressed model is less than 25MB 😄)
 - #### Procfile : needed for Heroku to know what commands it need to run.
 - #### requirements.txt : to specify the libraries needed to install to Heroku.
 - #### runtime.txt : to specify specific version of python.


# Details of Project

**Age Gender Ethnicity Predictor** is web-app deployed on Heroku.
- ## Model Training
  [Go to my training notebook on kaggle](https://www.kaggle.com/shanmukh05/age-sex-ethnicity-detection-using-multi-ouput)
     - Library used : **TensorFlow**
     - Pretrained Model : **MobileNetV2** (Due to 500MB limit on heroku I used smaller model. A big model with better training will give better results)
     - Technique used : **MultiLabel classification**. 
     - Dataset : [UTK Face Dataset](https://www.kaggle.com/shanmukh05/agedetection)
     - My model will output a `19D` array as output when given an image as input (resized to `(200,200,3)`)
     - ID `0-11` gives information about *Age*
         - MultiClass classification.
         - if `argmax(predicted[:12] = 3)` that means the age is between 3\*10+1 and 3\*10+10 ie., 31-40.
     - ID `12-13` gives information about *Gender*
         - Binary Classification
         - 0- *Male* 1- *Female*
     - ID `14-18` gives information about *Ethnicity*
         - MultiClass Classification
         - 0- *White*, 1- *Black*, 2- *Asian*, 3-*Indian*, 4-*Others*

# Note : All the labels used are defined in [UTK Face Dataset](https://www.kaggle.com/shanmukh05/agedetection)
 
 - ## Frontend
     - used an online template and made changes to **HTML**,**CSS**,**JS** files.

 - ## Deployment
     - You can go through this YT playlist created by me for reference [Deploying ML model on Heroku using Flask](https://www.youtube.com/playlist?list=PL9NRL49Dq8llKW_QW510V-MgIGWhvZoOX).
     - For more details visit [Heroku](https://www.heroku.com/).

# Things I couldn't do because of memory constraint 😢
- Using `MTCNN` to detect whether the face is present in uploaded image or not.
- Using better pretrained models for training on UTK face dataset.
