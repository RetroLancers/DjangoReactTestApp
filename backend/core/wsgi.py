import os

from django.core.wsgi import get_wsgi_application

# Default to development settings unless DJANGO_SETTINGS_MODULE is explicitly set by the environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.development')

application = get_wsgi_application()
