from django.shortcuts import render
# , redirect
# from django.urls import reverse

# from django.conf import settings
# from django.core.mail import EmailMessage
#
# from .forms import ContactForm
# from .serializers import ContactSerializer


def homepage(request):
    # redirect in SPA app now
    # if request.user.is_authenticated:
    #     return redirect(reverse('main_curricula:curriculum'))
    return render(request, 'homepage/homepage.html')

def about(request):
    return render(request, 'homepage/about.html')


def privacy(request):
    return render(request, 'homepage/privacy.html')


def terms(request):
    return render(request, 'homepage/terms.html')


# def Contact(request):
#     if request.method == 'POST':
#         # create a form instance and populate it with data from the request:
#         form = ContactForm(request.POST)
#         # check whether it's valid:
#         if form.is_valid():
#             # send an email
#             ContactSerializer.send_email(form.cleaned_data)
#             return render(request, 'homepage/contact-success.html', {'form': form})
#
#     # if a GET (or any other method) we'll create a blank form
#     else:
#         form = ContactForm()
#
#     return render(request, 'homepage/contact.html', {'form': form})

