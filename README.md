# Physics is Beautiful

## Installation


Requires Python 3.5, recommended to run in a virtual environment (virtualenv, consider using virtualenvwrapper to manage your virutal environments)

* install requirements:
```
pip install -r requirements.txt
```

Requires MySql

* install mysql:
```
brew install mysql
```
* create a db named `pib_development` (either use mysql command line or sequel pro - like program: https://www.sequelpro.com, ex:

```
mysql.server start
mysql -h 127.0.0.1 -u root
create database pib_development;
exit;
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

* Build the front-end
```
./node_modules/.bin/webpack --config webpack.config.js
```
(if you want to reload automatically when changes are made, you can run):
```
./node_modules/.bin/webpack --config webpack.config.js --watch
```

* Setup the db:
```
./manage.py migrate
```

* Act

* Activate your virtual environment
* Run:
```
./manage.py runserver
```

* You should find the site running on `http://localhost:8000`

* To create an admin account run `/manage.py createsuperuser`

* To login to the admin account go to `http://localhost:8000/admin`

* pib will look for a default curriculum named `Default Curriculum`

* TODO: add game

## Development

* We respect the rules set out by pep8 with the exception of a 100 character line limit.
* We use the flake8 python script for linting.

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
* run `eb init`
* on git `develop` branch run `eb use pib-dev`
* on git `master` branch run `eb use pib-prod`

To Deploy:

* `eb deploy`
It will deploy to the proper environment depending on what branch you are on.


## Launching the Dev Environment

To save money, the dev environment will not always be up. To launch the dev environment, from the `develop` branch, run the following command:

```
eb create --branch_default --cfg pib-dev --timeout 40
```

Follow the directions, and use "pib-dev" instead of the default "physicsisbeautiful-dev".

This will take several minutes to run. If the command fails, you can try to run, `eb deploy` from the `develop` branch. Otherwise you may need to go on the aws console (Elastic Beanstalk) and rebuild the environment. The only other piece is that if you change the dns from `pib-dev.us-east-1.elasticbeanstalk.com` then you will need to go to the Google Domains and modify the DNS for `dev.physicsisbeautiful.com` to point at the new URL of the new dev environment.

Run `eb deploy` once the environment is up to get the latest version of dev running in the environment.
