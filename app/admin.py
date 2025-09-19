from django.contrib import admin

# Register your models here.
from app.models import GeneralInfo

@admin.register(GeneralInfo)
class GeneralInfoAdmin(admin.ModelAdmin):
    list_display = [
    'company_name',
    'location',
    'email',
    'phone',
    'open_hours',
]

# To disable add permission
# def has_add_permission(self, request, obj=None):
#     return False

# To disable update permission
# def has_change_permission(self, request, obj=None):
#     return False

# To disable delete permission
# def has_delete_permission(self, request, obj=None):
#     return False

# To set fields as read-only (disable update for specific fields)
# readonly_fields = [
#     'email'
# ]