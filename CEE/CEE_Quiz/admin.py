from django.contrib import admin
from .models import Subject, Chapter , Question, TestResult
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
class ChapterAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'subject')
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'chapter', 'question_text' , 'correct_option')
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name' , 'topic', 'score', 'total_attempted', 'created_at')


admin.site.register(Subject, SubjectAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(TestResult, UserAdmin)

