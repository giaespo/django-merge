# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from conc.models import Prova


class ProvaAdmin(admin.ModelAdmin):
  class Media:
    js = ('admin_edit_concurrent.js',)

    css = {
      'all': ('admin_edit_concurrent.css',)
    }

admin.site.register(Prova,ProvaAdmin)

