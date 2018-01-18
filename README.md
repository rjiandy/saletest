This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Notes #

## How To Run Dev ##
* Clone/Download this project into your development env.
* install dependencies using `npm install`
* run the apps using `npm start`

## Assumption && Side Notes##
* The detail of the item only display some text instead of rendering a whole new page
* There are mock api function calls that can be change if there's a back-end
* CMS can be accessed using `pen` button on the header
* CMS image upload is not working properly because the image isn't uploaded to any server instead a generated random url will be added
* The item list will be increased based on how many load more called (actually if using real server it has a different piece of state in the redux for now it's using the same piece)
* No Back-end service
* Delete in the CMS is not working yet (Will try to do it if there's more time)