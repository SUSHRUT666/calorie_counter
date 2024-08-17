from rest_framework import serializers

class FoodSerializer(serializers.Serializer):
    food = serializers.CharField(max_length=100)