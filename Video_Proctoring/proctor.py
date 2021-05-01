
import os
import threading
import cv2
import dlib
import numpy as np
from yolov3_model import YoloV3, load_weights, draw_outputs
from dlib_points import *
from define_mouth_distances import return_distances


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
yolo = YoloV3()
load_weights(yolo, 'yolov3.weights')
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('shape_68\shape_predictor_68_face_landmarks.dat.tar')

d_outer, d_inner = return_distances(detector, predictor)
cap = cv2.VideoCapture(0)
_, frame_size = cap.read()

def eye_mouth_detector():

    ret, img = cap.read()
    threshold_eye = img.copy()
    w, h = img.shape[:2]
    outer_points = [[49, 59], [50, 58], [51, 57], [52, 56], [53, 55]]
    inner_points = [[61, 67], [62, 66], [63, 65]]
    left = [36, 37, 38, 39, 40, 41]
    right = [42, 43, 44, 45, 46, 47]
    kernel = np.ones((9, 9), np.uint8)
    cv2.namedWindow('image')
    cv2.createTrackbar('threshold', 'image', 0, 255, nothing)


    while True:
        ret, img = cap.read()
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        detect = detector(gray_img, 1)

        for rect in detect:
            predict = predictor(gray_img, rect)
            predict = shape_to_np(predict)

            #mouth
            mouth_outside = 0
            mouth_inside = 0
            for i, (a, b) in enumerate(outer_points):
                if d_outer[i] + 5 < predict[b][1] - predict[a][1]:
                    mouth_outside += 1
            for i, (a, b) in enumerate(inner_points):
                if d_inner[i] + 3 < predict[b][1] - predict[a][1]:
                    mouth_inside += 1
            if mouth_outside > 3 or mouth_inside > 2:
                print('Mouth is open, student is cheating!')
            for (x, y) in predict[48:]:
                cv2.circle(img, (x, y), 2, (255, 0, 0), -1)

            #eyes
            mask = np.zeros((w, h), dtype=np.uint8)
            mask, end_points_left = eye_on_mask(mask, left, predict)
            mask, end_points_right = eye_on_mask(mask, right, predict)
            mask = cv2.dilate(mask, kernel, 5)
            eyes = cv2.bitwise_and(img, img, mask=mask)
            mask = (eyes == [0, 0, 0]).all(axis=2)
            eyes[mask] = [255, 255, 255]
            mid = (predict[42][0] + predict[39][0]) // 2
            eyes_gray = cv2.cvtColor(eyes, cv2.COLOR_BGR2GRAY)
            threshold = cv2.getTrackbarPos('threshold', 'image')
            _, threshold_eye = cv2.threshold(eyes_gray, threshold, 255, cv2.THRESH_BINARY)
            threshold_eye = process_thresh(threshold_eye)
            eyeball_pos_left = contouring(threshold_eye[:, 0:mid], mid, img, end_points_left)
            eyeball_pos_right = contouring(threshold_eye[:, mid:], mid, img, end_points_right, True)
            print_eye_pos(eyeball_pos_left, eyeball_pos_right)

        cv2.imshow('mouth_detector', img)
        cv2.imshow("image", threshold_eye)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

def phone_detection():
    while True:
        ret, detected_output = cap.read()
        box = cv2.cvtColor(detected_output, cv2.COLOR_BGR2RGB)
        box = cv2.resize(box, (320, 320))
        box = box.astype(np.float32)
        box = np.expand_dims(box, 0)
        box = box / 255
        class_names = [c.strip() for c in open("classes.txt").readlines()]
        boxes, scores, classes, nums = yolo(box)
        count = 0
        for i in range(nums[0]):
            if int(classes[0][i] == 0):
                count += 1
            if int(classes[0][i] == 67):
                print("Mobile Phone Detected, student is cheating!")
        if count == 0:
            print('No person detected,student is cheating!')
        elif count > 1:
            print('More than one person detected,student is cheating!')
        detected_output = draw_outputs(detected_output, (boxes, scores, classes, nums), class_names)
        cv2.imshow('Proctor', detected_output)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

t1 = threading.Thread(target=eye_mouth_detector)
t2 = threading.Thread(target=phone_detection)
t1.start()
t2.start()
t1.join()
t2.join()
cap.release()
cv2.destroyAllWindows()
