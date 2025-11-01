import numpy as np
from django.db import models
from backend.shops.productShop import *
import requests
import cv2
from requests.auth import HTTPDigestAuth

class DVR(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    ip = models.GenericIPAddressField(max_length=15)
    port = models.PositiveIntegerField(max_length=16)
    username = models.CharField(max_length=16)
    password = models.CharField(max_length=16)

    def __str__(self):
        return f"DVR {self.ip}:{self.port}"



class DVRService:
    def __init__(self, dvr):
        self.dvr = dvr

    def get_camera_image(self):
        url = f"http://{self.dvr.ip}:{self.dvr.port}/snapshot"
        auth = HTTPDigestAuth(self.dvr.username, self.dvr.password)

        try:
            response = requests.get(url, auth=auth, stream=True)
            response.raise_for_status()

            # با استفاده از OpenCV تصویر را بخوانید
            image = cv2.imdecode(np.frombuffer(response.content, np.uint8), -1)
            return image

        except requests.RequestException as e:
            print(f"Error connecting to DVR: {e}")
            return None

