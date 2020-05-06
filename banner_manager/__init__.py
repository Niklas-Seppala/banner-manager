import os
from flask import Flask


def create_app(config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        DEBUG=True,
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'banner_manager.sqlite'),
        UPLOAD_FOLDER=os.path.join(app.instance_path, 'banners')
    )

    app.jinja_env.trim_blocks = True
    app.jinja_env.lstrip_blocks = True

    if config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(config)

    create_app_folders(app)
    register_components(app)

    return app


def register_components(app):
    pass


def create_app_folders(app):
    pass
