from django.shortcuts import render

from rest_framework import viewsets
from .models import Complaint
from .serializers import ComplaintSerializer

class ComplaintViewSet(viewsets.ModelViewSet):
    serializer_class = ComplaintSerializer
    
    def get_queryset(self):
        queryset=Complaint.objects.all().order_by('-created_at')
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        return queryset