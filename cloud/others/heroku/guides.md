### Getting started
* [Register](https://dashboard.heroku.com/apps)
* Install [Heroku CLI](https://cli-assets.heroku.com/heroku-x64.exe)
* Login
    * `heroku login`
* Create node.js app:
    * `git clone https://github.com/heroku/node-js-getting-started.git`
* Create heroku app:
    * `cd node-js-getting-started`
    * `heroku create` (should generate unique app URL, git URL)
* (Optional) Run app locally:
    * `heroku local`
* Push to heroku repository:
    * `git push heroku main`
* Make sure it's working:
    * `heroku open`

### Configure app
* Must have:
    * `Procfile` - file with app type and start command
        * Optional for node.js (default - `web: npm start`)
* Optional files:
    * `.env` - environment
    * `app.json` - metadata (name, description, keywords..)
