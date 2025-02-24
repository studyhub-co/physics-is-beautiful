# Physics is Beautiful

## Installation

Requires Python 3.5, recommended to run in a virtual environment (virtualenv, consider using virtualenvwrapper to manage your virtual environments)

* install requirements:
```
pip install -r requirements.txt
```

Requires PostgreSQL

* install PostgreSQL:
```
brew install postgresql
```
* create a db named `pib`:  ex:

```
createdb pib
```

* connect to `pib` database with `postgres` user and create EXTENSION

```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

* install npm:
```
brew install node
```

* get packages (from root directory):
```
npm install
```

## To run locally

* Create a `.env` file in the root directory that contains just:
```
DJANGO_SETTINGS_MODULE=pib.local_settings
``` 
* Build the front-end
```
npm run dev
```

* Activate your virtual environment

* Setup the db:
```
./manage.py migrate
```
* Create an admin account by running `/manage.py createsuperuser`

* Run:
```
./manage.py runserver
```
* You should find the site running on `http://localhost:8000`

* To login to the admin account go to `http://localhost:8000/admin`

* pib will look for a default curriculum named `Default Curriculum`, so in the admin create a curriculum titled `Default Curriculum`

* Then create a unit, module, lesson, and question, then navigate to /curriculum/ to see what you created!

## Structure
Django apps:
* `pib` contains the project settings. 
* `curricula` is the main app that produces the page at /curriculum/. The files apis.py and urls_api.py utilize the Django REST Framework to make an API for the models

### Models
The model hierarchy is:
* Curriculum (to test out the app make a curriculum called “Default Curriculum”)
* Unit 
* Module
* Lesson
* Question

## Deployment

www.physicsisbeautiful.com and dev.physicsisbeautiful.com are hosted on Elastic Beanstalk.

To Setup:

* install AWS CLI (http://docs.aws.amazon.com/cli/latest/userguide/installing.html):
```
brew install awscli
```
* install AWS EB CLI (http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html):
```
brew install awsebcli
```
* run `aws configure` 
* run `eb init` (you'll need the access id/key 
* on git `develop` branch run `eb use pib-dev`
* on git `master` branch run `eb use pib-prod`

To Deploy:

* `eb deploy --timeout 20`
It will deploy to the proper environment depending on what branch you are on.


## Launching the Dev Environment

To save money, the dev environment will not always be up. To launch the dev environment, from the `develop` branch, run the following command:

```
eb create --branch_default --cfg pib-dev --timeout 40
```

Follow the directions, and use "pib-dev" instead of the default "physicsisbeautiful-dev".

This will take several minutes to run. If the command fails, you can try to run, `eb deploy` from the `develop` branch. Otherwise you may need to go on the aws console (Elastic Beanstalk) and rebuild the environment. The only other piece is that if you change the dns from `pib-dev.us-east-1.elasticbeanstalk.com` then you will need to go to the Google Domains and modify the DNS for `dev.physicsisbeautiful.com` to point at the new URL of the new dev environment.

Run `eb deploy` once the environment is up to get the latest version of dev running in the environment.



## Development

* We respect the rules set out by pep8 with the exception of a 100 character line limit.
* We use the flake8 python script for linting.
