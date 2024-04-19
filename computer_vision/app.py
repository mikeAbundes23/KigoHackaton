import os
import cv2
import random
from ultralytics import YOLO
from tracker import Tracker
video_path = os.path.join('.', 'data', 'people.mp4')

cap = cv2.VideoCapture(video_path)

ret, frame = cap.read()


model = YOLO("yolov8n.pt")
tracker = Tracker()
colors = [(random.randint(0,255), random.randint(0,255), random.randint(0,255)) for j in range(10)]
i=0
while ret:
    i+=1
    results = model(frame)

    result = results[0]
    detections = []
    for r in result.boxes.data.tolist():
        x1, y1, x2, y2, score, class_id = map(int, r)  # Convert to integers
        # print(f"{x1}:{x2}:{y1}:{y2}:{score}:{class_id}")
        detections.append([x1, y1, x2, y2, score])
        
    tracker.update(frame, detections)
    for track in tracker.tracks:
        bbox = track.bbox
        x1, y1, x2, y2 = bbox
        track_id = track.track_id
        cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (colors[track_id % len(colors)]), 3)


    cv2.imshow('frame', frame)
    cv2.waitKey(25)

    ret, frame = cap.read()
cap.release()
cv2.destroyAllWindows()

