from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils.text import slugify
from rest_framework.authtoken.models import Token
from backend.location.location import Location
from backend.location.address import Address
from phonenumber_field.modelfields import PhoneNumberField
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("The Phone Number field must be set")
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(phone_number, password, **extra_fields)


    # For newly created users
    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
            Token.objects.create(user=instance)




class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.CharField(max_length=20, unique=True, blank=True)
    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = None
    phone_number = PhoneNumberField(region="IR",unique=True)
    activation_key = models.CharField(max_length=150, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    role = models.ForeignKey(Role ,blank=True, null=True,on_delete=models.CASCADE)
    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()


    def __str__(self):
        return f"{self.phone_number}"





class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.CharField(max_length=20, unique=True, blank=True)
    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Unit(models.Model):
    pass


class NavigationLink(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.title

class Sublink(models.Model):
    navigationlink = models.ForeignKey(NavigationLink, on_delete=models.CASCADE , blank=True, null=True)
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.title

class PlatformSettings(models.Model):
    template_name = models.CharField(max_length=255)
    title_prefix = models.CharField(max_length=255)
    description_prefix = models.CharField(max_length=255)
    backend_address = models.URLField()
    backend_port = models.PositiveIntegerField()
    frontend_address = models.URLField()
    frontend_port = models.PositiveIntegerField()
    navigation_links = models.ManyToManyField(NavigationLink, blank=True, null=True)
    footer_content = models.TextField()
    platform_logo = models.ImageField(upload_to='platform_logos/', null=True, blank=True)

    def __str__(self):
        return f"{self.template_name} - Settings"