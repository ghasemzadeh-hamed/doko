from django.db import models
from django.contrib.auth import get_user_model
from backend.models import *
from djmoney.models.fields import MoneyField
from djmoney.money import Money
User = get_user_model()

class Project(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    budget = MoneyField(max_digits=13 ,decimal_places=2, default_currency='IRR')
    status = models.CharField(max_length=20, choices=[('ongoing', 'Ongoing'), ('completed', 'Completed')])
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    assigned_to = models.ManyToManyField(User, related_name='assigned_tasks')
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class MarketAnalysis(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    market_research = models.TextField()
    competitors_analysis = models.TextField()
    customer_analysis = models.TextField()
    sales_process = models.TextField()
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class StrategicPlanning(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    strategies = models.TextField()
    action_plan = models.TextField()
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class ProjectManagement(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    project_manager = models.ForeignKey(User, on_delete=models.CASCADE)
    project_team = models.ManyToManyField(User, related_name='project_teams')
    progress_report = models.TextField()
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class Budgeting(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    budget_items = models.TextField()
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class ControlAndMonitoring(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    reports = models.TextField()
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class RiskManagement(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    risk_analysis = models.TextField()
    risk_response_plan = models.TextField()
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class DataAnalysis(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    data_sources = models.TextField()
    data_analysis_report = models.TextField()
    tag = models.ManyToManyField(Tag, null=True,blank=True)

class DevelopmentProcess(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    development_steps = models.TextField()
    tag = models.ManyToManyField(Tag, null=True,blank=True)

