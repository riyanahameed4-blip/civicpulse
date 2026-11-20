from django.db import models

class Complaint(models.Model):
    STATUS_CHOICES = [
        ('pending','Pending'),
        ('in_progress','In Progress'),
        ('resolved','Resolved'),
    ]
    
    title = models.CharField(max_length=200)
    description=models.TextField()
    photo=models.ImageField(upload_to='complaints/')
    latitude=models.FloatField()
    longitude=models.FloatField()
    status=models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
    ) 
    created_at =models.DateTimeField(auto_now_add=True)  
    
    
    def __str__(self):
        return self.title