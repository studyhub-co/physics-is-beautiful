# syntax=docker/dockerfile:1
FROM python:3.5
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
RUN apt-get -y update
# Upgrade already installed packages:
# RUN apt-get -y upgrade
# Install a packages to build SPA:
#RUN apt-get -y install nodejs npm # mc
# need for install django-react-djeddit-client
#RUN apt-get -y install python2.7-minimal
#RUN ln -s /usr/bin/python2.7 /usr/bin/python2
WORKDIR /code
COPY requirements.txt /code/
COPY requirements.dev.txt /code/
RUN pip install -r requirements.txt
RUN pip install -r requirements.dev.txt
COPY . /code/


EXPOSE 8000