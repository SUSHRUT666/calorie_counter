from django.shortcuts import render
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import FoodSerializer

import sys
import os

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
class CalorieCountView(APIView):
    def post(self, request):
        serializer = FoodSerializer(data=request.data)
        if serializer.is_valid():
            food = serializer.validated_data['food']
            api_key = "x1Wi5khLf7nLd06uiwcGkw==MIFz5CMP3p45965q"
            url = f"https://api.calorieninjas.com/v1/nutrition?query={food}"
            headers = {'X-Api-Key': api_key}
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                data = response.json()
                return Response(data)
            else:
                return Response({"error": "Unable to fetch calorie data"}, status=400)
        return Response(serializer.errors, status=400)
# Create your views here.
