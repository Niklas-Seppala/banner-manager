import os
from urllib.parse import urlparse
import requests
from flask import (Blueprint, flash, g, redirect, render_template, request,
                   url_for, current_app, get_flashed_messages, send_from_directory, jsonify)
from banner_manager.db import get_db
from werkzeug.utils import secure_filename

bp = Blueprint('banners', __name__)
