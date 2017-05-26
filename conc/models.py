# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from django.db import models

class Prova( models.Model ):
    charfield = models.CharField(max_length=100)
    textfield = models.TextField()
    booleanfield = models.BooleanField(default = False)
    integerfield = models.IntegerField(null=True,blank=True)
    datefield = models.DateField(null=True,blank=True)
    datetime = models.DateTimeField(null=True,blank=True)
    decimalfield = models.DecimalField(max_digits=5, decimal_places=2,null=True,blank=True)
    duration = models.DurationField(null=True,blank=True)
    email = models.EmailField(null=True,blank=True)
    filefield = models.FileField(upload_to='uploads/',null=True,blank=True)
    filepathfield = models.FilePathField(path="/home/images", match="foo.*", recursive=True,null=True,blank=True)
    floatfield = models.FloatField(null=True,blank=True)
    
