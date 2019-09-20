# sury-cube

test
1. sury-cube-front
    ```
    vue create sury-cube-front
    ```

2. sury-cube-back
    - nodemon 설정 
        ```
        npm i -D nodemon
        ```
        ``` 
        # package.json
      "nodemonConfig": {
                "ignore": ["test/*"]
              },
        ```
        
    - babel 설정
      ```
        "scripts": {
          "serve": "nodemon --exec babel-node index.js",
      ```
      https://www.codementor.io/michaelumanah/how-to-set-up-babel-7-and-nodemon-with-node-js-pbj7cietc
    
    - jest
      ```
        npm install --save-dev babel-jest babel-polyfill
      ```
      ```
      # package.json
        "scripts": {
          "jest": "jest"
      ```
      https://jest-bot.github.io/jest/docs/getting-started.html
      
      ** webstorm 설정 - Preferences > Javascript > Library > Jest
