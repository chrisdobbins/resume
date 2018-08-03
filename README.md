# Resume #

## About ##
There are three discrete components in this project. The shockingly named `/resume-pdf-generator`contains a Node.js script that creates a PDF of a resume using data from a JSON file. `/resume-web` is home to a React version of a resume that uses data from the same JSON file. `/common` contains `resume.json` and a helper function in its `bin/` directory. This helper function sorts components by date descending.

## Why This Structure? ##
It was a good way to learn more about npm and using ES6 modules while reducing duplication of code and the complexity of maintaining that duplication. The latter point is admittedly an overoptimization for such a small scale project, but the process was edifying, nonetheless.

## TODOs (in no particular order) ##
* Embed a link to download the PDF.
* Create a deployment script that generates the PDF and deploys `resume-web` to GitHub Pages.
* Add a Skills section.
* Refactor.
