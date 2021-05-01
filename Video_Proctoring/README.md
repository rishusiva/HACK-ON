[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)

# Computer Vision - Backbone of our Project


# Features Used:

## OpenCV
used for developing real time computer vision applications. In our case for real time proctoring of a student. OpenCV has been used in this project for :
* Image Processing
* Video Capture
* Detecting features of a face 
* Object Detection

## Dlib
This library goes hand in hand with opencv for detecting and predicting various features of the face.

## YoloV3
`YoloV3` is a model used for object detection. In our case, mobile phone. In this project we have used pretrained YoloV3 model .


# Proctor Features:
* Detects face as 68 points using `shape_predictor_68_face_landmarks` 
* Detects if the eye is looking in some other direction than on the screen.
* Detects the movement of the mouth.
* Detects if the person is missing , if there are two or more people or if there is a mobile phone.
