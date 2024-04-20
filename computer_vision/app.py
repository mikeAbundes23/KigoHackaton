import os
import cv2
import random
from ultralytics import YOLO
from tracker import Tracker
video_path = os.path.join('.', 'data', 'buap.mp4')
video_out_path = os.path.join('.', 'out.mp4')


font                   = cv2.FONT_HERSHEY_SIMPLEX
bottomLeftCornerOfText = (10,400)
fontScale              = 1
fontColor              = (255,0,0)
thickness              = 2
lineType               = 2

cap = cv2.VideoCapture(video_path)

ret, frame = cap.read()
cap_out = cv2.VideoWriter(video_out_path, cv2.VideoWriter_fourcc(*'MP4V'), cap.get(cv2.CAP_PROP_FPS),(frame.shape[1], frame.shape[0]))

inside = 10
model = YOLO("yolov8n.pt")
tracker = Tracker()
colors = [(random.randint(0,255), random.randint(0,255), random.randint(0,255)) for j in range(10)]
procesed = {-1}
last = {}
first_time = {}
while ret:
    results = model(frame)

    result = results[0]
    detections = []
    actual_class = -1
    for r in result.boxes.data.tolist():
        x1, y1, x2, y2, score, class_id = map(int, r) 
        actual_class = class_id
        if actual_class== 0:
            detections.append([x1, y1, x2, y2, score])
        
    tracker.update(frame, detections)

    
    for track in tracker.tracks:
        bbox = track.bbox
        x1, y1, x2, y2 = bbox
        track_id = track.track_id
        actual = int(y1)
        if(track_id not in first_time):
            first_time[track_id]=actual
        if((track_id in last) and (track_id not in procesed)):
            if(last[track_id]>actual and first_time[track_id] > 300):
                inside-=1
            elif (first_time[track_id]<200):
                inside+=1
            procesed.add(track_id)
        if(actual >200 and actual < 500):
            last[track_id] = actual
        cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (colors[track_id % len(colors)]), 3)

    cv2.putText(frame,f'Personas: {inside}', 
        bottomLeftCornerOfText, 
        font, 
        fontScale,
        fontColor,
        thickness,
        lineType)
    cv2.putText(frame,f'Personas: {inside}', 
        bottomLeftCornerOfText, 
        font, 
        fontScale,
        fontColor,
        thickness,
        lineType)
    cv2.line(frame,(0,500),(500,500), color = [0,0,255],thickness=2)
    cv2.line(frame,(0,330),(500,330), color = [0,255,0],thickness=2)
    cv2.imshow('frame', frame)
    cv2.waitKey(10)

    cap_out.write(frame)
    ret, frame = cap.read()
cap.release()
cap_out.release()
cv2.destroyAllWindows()

