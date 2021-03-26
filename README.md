# Eye sight test application

![logo](img/logo.png)

The application provides the option to do an easy eye sight test (as you would you in your eye care clinic).

We pass a lot of hours in front of digital screens, and this creates a big eye sight fatigue. In order to know
our current eye sight state, we can run this easy test periodically. The application records all the executed
test results, so we can check then anytime.

## How to use

The application runs in a web application. The easiest way is to run the application in your local machine.
Follow this steps:

```
cd eyesight-test
# Let's create a virtual environment to have our workspace clean
virtualenv virt
source virt/bin/activate
pip install -r requirements.txt
python web.py
```

The web application will be available at: `localhost:5000` in your web browser.

## Technical details

The application is based in:
- Flask python web application framework
- sqlite3 as database
- [anime.js](https://animejs.com/) to create the warmup animations
