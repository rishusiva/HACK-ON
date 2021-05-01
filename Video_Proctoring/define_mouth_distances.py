
import cv2
from dlib_points import shape_to_np

def return_distances(detector, predictor):
    outer_points = [[49, 59], [50, 58], [51, 57], [52, 56], [53, 55]]
    d_outer = [0]*5
    inner_points = [[61, 67], [62, 66], [63, 65]]
    d_inner = [0]*3
    cap = cv2.VideoCapture(0)
    while(True):
        ret, img = cap.read()
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        detect = detector(gray_img, 1)
        for rect in detect:
    
            predict = predictor(gray_img, rect)
            predict = shape_to_np(predict)
            for (x, y) in predict:
                cv2.circle(img, (x, y), 2, (0, 255, 0), -1)

        cv2.putText(img, 'Press a to begin proctoring', (30, 30), cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 255), 2)
        cv2.imshow("Pre_Proctor", img)
        if cv2.waitKey(1) & 0xFF == ord('a'):
            for i in range(100):
                for i, (a, b) in enumerate(outer_points):
                    d_outer[i] += predict[b][1] - predict[a][1]
                for i, (a, b) in enumerate(inner_points):
                    d_inner[i] += predict[b][1] - predict[a][1]
            break
    cv2.destroyAllWindows()
    d_outer[:] = [x / 100 for x in d_outer]
    d_inner[:] = [x / 100 for x in d_inner]
    return d_outer, d_inner