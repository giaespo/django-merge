# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from django.db import models

class Prova( models.Model ):
    name = models.CharField(max_length=100)
    d = models.CharField(max_length=100)
    a = models.CharField(max_length=100)
    b = models.CharField(max_length=100)
    c = models.CharField(max_length=100)
    e = models.TextField()
    
