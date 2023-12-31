from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
import json
import requests
from django.views import View


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if not email or not password:
            return JsonResponse({'success': False, 'error': 'Email and password are required.'})

        # Create a new user
        user = User.objects.create_user(username=email, email=email, password=password)

        return JsonResponse({'success': True})

    return JsonResponse({'success': False, 'error': 'Invalid request method.'})


@csrf_exempt
def signin(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return JsonResponse({'success': False, 'error': 'Email and password are required.'})

            # Authenticate the user
            user = authenticate(request, username=email, password=password)

            if user is not None:
                # Log the user in
                login(request, user)
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'error': 'Invalid email or password.'})

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON data.'})

    return JsonResponse({'success': False, 'error': 'Invalid request method.'})


class WeatherView(View):
    def get(self, request):
        city_name = request.GET.get('city')
        api_key = 'bfab394143b664363ac7da83b2693f5c'
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={api_key}'

        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            return JsonResponse(data)
        except requests.RequestException as e:
            return JsonResponse({'error': f'Request failed: {str(e)}'}, status=500)
        except requests.HTTPError as e:
            return JsonResponse({'error': f'HTTP error: {str(e)}'}, status=e.response.status_code)
        except Exception as e:
            return JsonResponse({'error': f'Unexpected error: {str(e)}'}, status=500)