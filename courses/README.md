# Courses application

## Description

The Courses application written with DJANGO. 
The static folder contains the main part of PWA (react/javascript/typescript) application of this project.

## Usage

### Installing

See README.md on the project level

### Folder structure

Here's a main folders structure for the Courses application:

```
sandbox-eval-project/   # "Evaluate" project
static/courses/js/      # Root directory of Courses part of PWA application.
|- js/codesandbox-apps/ # Common sandbox applications that uses by Studio Editor 
|- containers/StudioViews/EditorsViews/containers/LessonWorkSpace/  # Lesson editor + VScode editor.
```

### "Evaluate" project

"Evaluate" project is a project that online evaluates sandbox sources to js bundle in the client browser.
Result (js bundle) will embed into HTML file. Can run as a standalone page or inside an iframe of the PWA application. 

Compiled package of "Evaluate" project located at
courses/sandbox-eval-project/www/courses/js/codesandbox-apps/eval/
TODO: change codesandbox-apps/eval/ to eval/    

#### JS bundle cache

When the evaluation is done, the "Evaluate" project will save the cache of the js bundle in IndexedDB of the Browser.
In the case of LessonEditor, the js bundle cache will save on the backend side too.    
The flow of this process can see in the picture below. 


### Courses part of PWA application (PWA/Courses)

PWA/Courses - main frontend part of main PWA application. 

#### Main structure

PWA/Courses serve Course/Unit/Module/Lesson/Material views.
The material view has an iframe that contains an HTML file from the "Evaluate" project inside.
    
### Communication between PWA application "Evaluate" project

PWA/Courses and "Evaluate" project communicate via EventTarget Web API.


## References

TODO