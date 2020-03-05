import hashlib

from django.db import models
# from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import JSONField
from django.db.models.signals import pre_save
from django.dispatch import receiver

# from profiles.models import Profile

from . import BaseItemModel

# TODO move it to initial fixtures?
# {"data": }
SANDOX_TEMPLATE_REACT_JSON_STRING = r"""{
   "version":66,
   "user_liked":false,
   "git":null,
   "external_resources":[

   ],
   "npm_dependencies":{
      "react-dom":"16.0.0",
      "react":"16.0.0"
   },
   "is_sse":false,
   "team":null,
   "entry":"src/index.js",
   "updated_at":"2019-05-28T11:33:39",
   "original_git":null,
   "author":null,
   "screenshot_url":"https://screenshots.codesandbox.io/new.png",
   "view_count":4020046,
   "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f",
   "picks":[

   ],
   "like_count":1226,
   "template":"create-react-app",
   "description":null,
   "privacy":0,
   "preview_secret":null,
   "fork_count":0,
   "custom_template":null,
   "forked_template":null,
   "is_frozen":false,
   "owned":false,
   "room_id":null,
   "id":"new",
   "modules":[
      {
         "updated_at":"2019-05-28T11:33:39",
         "title":"package.json",
         "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f",
         "shortid":"ZGQK6",
         "is_binary":false,
         "inserted_at":"2018-02-07T14:00:44",
         "id":"dd3f0f6a-4555-457f-b2af-963bf00f9172",
         "directory_shortid":null,
         "code":"{\n  \"name\": \"new\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"keywords\": [],\n  \"main\": \"src/index.js\",\n  \"dependencies\": {\n    \"react\": \"16.8.6\",\n    \"react-dom\": \"16.8.6\",\n    \"react-scripts\": \"3.0.1\"\n  },\n  \"devDependencies\": {\n    \"typescript\": \"3.3.3\"\n  },\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test --env=jsdom\",\n    \"eject\": \"react-scripts eject\"\n  },\n  \"browserslist\": [\">0.2%\", \"not dead\", \"not ie <= 11\", \"not op_mini all\"]\n}\n"
      },
      {
         "updated_at":"2018-06-09T22:04:48",
         "title":"index.js",
         "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f",
         "shortid":"wRo98",
         "is_binary":false,
         "inserted_at":"2017-04-01T14:30:32",
         "id":"928871a1-bbdc-425c-ace2-0b302b14a58a",
         "directory_shortid":"GXOoy",
         "code":"import React from \"react\";\nimport ReactDOM from \"react-dom\";\n\nimport \"./styles.css\";\n\nfunction App() {\n  return (\n    <div className=\"App\">\n      <h1>Hello CodeSandbox</h1>\n      <h2>Start editing to see some magic happen!</h2>\n    </div>\n  );\n}\n\nconst rootElement = document.getElementById(\"root\");\nReactDOM.render(<App />, rootElement);\n"
      },
      {
         "updated_at":"2018-06-09T22:03:25",
         "title":"styles.css",
         "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f",
         "shortid":"qZyB7",
         "is_binary":false,
         "inserted_at":"2018-06-09T21:51:56",
         "id":"9224aee8-b579-4f68-8a8c-e647098f50cc",
         "directory_shortid":"GXOoy",
         "code":".App {\n  font-family: sans-serif;\n  text-align: center;\n}\n"
      },
      {
         "updated_at":"2018-02-07T14:06:13",
         "title":"index.html",
         "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f",
         "shortid":"BA1N",
         "is_binary":false,
         "inserted_at":"2017-04-08T15:19:04",
         "id":"9c54d8d0-5a0e-4e5f-8794-3092757733ee",
         "directory_shortid":"rgkK4",
         "code":"<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n\t<meta name=\"theme-color\" content=\"#000000\">\n\t<!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n\t<link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\">\n\t<link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n\t<!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n\t<title>React App</title>\n</head>\n\n<body>\n\t<noscript>\n\t\tYou need to enable JavaScript to run this app.\n\t</noscript>\n\t<div id=\"root\"></div>\n\t<!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n</body>\n\n</html>"
      }
   ],
   "directories":[
      {
         "updated_at":"2018-02-07T14:00:49",
         "title":"src",
         "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f",
         "shortid":"GXOoy",
         "inserted_at":"2018-02-07T14:00:49",
         "id":"d27aefca-c15c-41a1-b9d5-bd362fdd7f19",
         "directory_shortid":null
      },
      {
         "updated_at":"2018-02-07T14:04:34",
         "title":"public",
         "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f",
         "shortid":"rgkK4",
         "inserted_at":"2018-02-07T14:04:34",
         "id":"859f77fe-8e09-4efb-bd44-f66ea4f949e4",
         "directory_shortid":null
      }
   ],
   "collection":false,
   "title":null,
   "original_git_commit_sha":null,
   "tags":[

   ],
   "alias":null,
   "forked_from_sandbox":null
}
"""


class MaterialProblemTypeSandbox(BaseItemModel):
    # reverse field (see material_problem_type)

    # "version": 66,
    version = models.IntegerField(default=1)

    # TODO calculated field
    # "user_liked": false,

    # "git": null,
    git = models.URLField(null=True, blank=True)

    # "external_resources": [
    # ],
    external_resources = JSONField(default=list)

    # "npm_dependencies": {
    #     "react-dom": "16.0.0",
    #     "react": "16.0.0"
    # }
    npm_dependencies = JSONField(default=dict)

    # "is_sse": false,
    is_sse = models.BooleanField(default=False, null=True, blank=True)

    # "team": null,

    # "entry": "src/index.js",
    entry = models.TextField()

    # "updated_at": "2019-05-28T11:33:39",
    # exist in BaseItemModel

    # "original_git": null,

    # "author": null,
    # exist in BaseItemModel

    # "screenshot_url": "https://screenshots.codesandbox.io/new.png",
    screenshot_url = models.URLField(null=True, blank=True)

    # "view_count": 4020046,
    # TODO calculated field

    # "source_id": "6bd39aa7-9800-45fb-9487-c915634d8d4f",
    # source_id = models.UUIDField(default=uuid.uuid4, editable=False)
    # == MaterialProblemTypeSandbox.id

    # "picks": [
    #
    # ],
    picks = JSONField(default=list)

    # "like_count": 1226,
    # TODO calculated field

    # "template": "create-react-app",
    template = models.TextField(default="create-react-app")

    # "description": null,
    description = models.TextField(null=True, blank=True)

    # "privacy": 0,
    # "preview_secret": null,

    # "fork_count": 0,
    # TODO calculated field

    # "custom_template": null,
    custom_template = models.TextField(null=True, blank=True)

    # "forked_template": null,
    forked_template = models.TextField(null=True, blank=True)

    # "is_frozen": false,
    is_frozen = models.BooleanField(default=False)

    # "owned": false,
    # "room_id": null,

    # "id": "new",
    # exist in BaseItemModel

    # "modules": []
    # related_name = 'modules'

    # "directories": []
    # related_name = 'directories'

    # "collection": false,
    # collection = models.BooleanField(default=False)

    # "title": null,
    # name in BaseItemModel

    # "original_git_commit_sha": null,
    # "tags": [
    #
    # ],
    # "alias": null,

    # "forked_from_sandbox": null
    forked_from_sandbox = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL)


class MaterialProblemTypeSandboxDirectory(BaseItemModel):
    # "updated_at": "2018-02-07T14:00:49",
    # exist in BaseItemModel

    # "title": "src",
    # title = models.TextField()
    # name in BaseItemModel

    # "source_id": "6bd39aa7-9800-45fb-9487-c915634d8d4f",
    # source_id = models.UUIDField(default=uuid.uuid4, editable=False)
    # == MaterialProblemTypeSandbox.id

    # "shortid": "GXOoy",
    # sandox API client works with short ids, so we need to store it
    shortid = models.CharField(max_length=10)

    # "inserted_at": "2018-02-07T14:00:49",
    # created_on in BaseItemModel

    # "id": "d27aefca-c15c-41a1-b9d5-bd362fdd7f19",
    # uuid in BaseItemModel

    # "directory_shortid": null
    # parent directory id
    directory = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, null=True)

    sandbox = models.ForeignKey(MaterialProblemTypeSandbox, related_name='directories', on_delete=models.CASCADE)


class MaterialProblemTypeSandboxModule(BaseItemModel):
    # code: "import React from "react";↵import "./styles.css";↵↵export default function App() {↵  return (↵    <div className="App">↵      <h1>Hello CodeSandbox</h1>↵      <h2>Start editing to 11see some magic happen!</h2>↵    </div>↵  );↵}↵"
    code = models.TextField()

    # directory_shortid: "GXOoy"
    directory = models.ForeignKey(
        MaterialProblemTypeSandboxDirectory,
        related_name='directories',
        on_delete=models.CASCADE,
        null=True
    )

    # id: "322578c0-5cf6-4552-b170-f065b7a17a7e"
    # exist in BaseItemModel

    # inserted_at: "2020-01-13T13:13:02"
    # created_on in BaseItemModel

    # is_binary: false
    is_binary = models.BooleanField(default=False)

    # shortid: "5QyoA"
    shortid = models.CharField(max_length=10)

    # source_id: "e33bcee1-2d16-40ea-b578-f4af8d3a73e9"
    # source_id = models.UUIDField(default=uuid.uuid4, editable=False)
    # == MaterialProblemTypeSandbox.id

    # title: "App.js"
    # name in BaseItemModel

    # updated_at: "2020-01-13T13:13:03"
    # exist in BaseItemModel

    sandbox = models.ForeignKey(MaterialProblemTypeSandbox, related_name='modules', on_delete=models.CASCADE)

    """
    data: {
       code: "import React from "react";↵import "./styles.css";↵↵export default function App() {↵  return (↵    <div className="App">↵      <h1>Hello CodeSandbox</h1>↵      <h2>Start editing to 11see some magic happen!</h2>↵    </div>↵  );↵}↵"
       directory_shortid: "GXOoy"
       id: "322578c0-5cf6-4552-b170-f065b7a17a7e"
       inserted_at: "2020-01-13T13:13:02"
       is_binary: false
       shortid: "5QyoA"
       source_id: "e33bcee1-2d16-40ea-b578-f4af8d3a73e9"
       title: "App.js"
       updated_at: "2020-01-13T13:13:03"
    }
    """


class MaterialProblemTypeSandboxCache(models.Model):
    """
    Transpiled modules data (cache)
    """
    version = models.URLField()  # transpiler version
    data = JSONField(default=dict)
    # sandbox = models.OneToOneField(MaterialProblemTypeSandbox, related_name='cache', on_delete=models.CASCADE)
    # we can have > 1 of a cache for one sandbox (different versions)
    sandbox = models.ForeignKey(MaterialProblemTypeSandbox, related_name='cache', on_delete=models.CASCADE)

    # TODO remove old data functional

    class Meta:
        unique_together = [['sandbox', 'version']]


def to_short_id(text):
    return hashlib.sha1(str(text).encode('utf-8')).hexdigest()[:8]


@receiver(pre_save, sender=MaterialProblemTypeSandboxModule)
def module_will_change(sender, instance, **kwargs):
    # generate only is not exist
    if not instance.shortid:
        instance.shortid = to_short_id(instance.name)


@receiver(pre_save, sender=MaterialProblemTypeSandboxDirectory)
def directory_will_change(sender, instance, **kwargs):
    # generate only is not exist
    if not instance.shortid:
        instance.shortid = to_short_id(instance.name)

