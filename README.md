# Banner manager flask server
A simple tool for storing custom banners in Mount&Blade Bannerlord.

<br>
<img src="https://github.com/Niklas-Seppala/banner-manager/blob/master/banner_manager/static/images/bannerman-small.png" width="200" height="200">
<br>

#### Setup virtual environment

```bash
$ python3 -m venv /path/to/new/virtual/environment
$ ./venv/Scripts/activate
```

#### Install dependencies
```bash
$ pip install -r requirements.txt
```

#### Setup flask environment
```bash
# bash
$ export FLASK_APP=banner_manager
$ export FLASK_ENV=development
```
```ps1
# Powershell
> $env:FLASK_ENV="development"
> $env:FLASK_APP="banner_manager"
```

#### Run
```bash
$ flask run
```

