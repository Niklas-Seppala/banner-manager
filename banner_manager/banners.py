import os
from urllib.parse import urlparse
import requests
from flask import (Blueprint, flash, g, redirect, render_template, request,
                   url_for, current_app, get_flashed_messages, send_from_directory, jsonify)
from banner_manager.db import get_db
from werkzeug.utils import secure_filename

bp = Blueprint('banners', __name__)


@bp.route('/img/<path:filename>')
def get_img(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename, as_attachment=True)


@bp.route('/banners')
def banners():
    db = get_db()
    banners = db.execute('SELECT * FROM banner').fetchall()
    data = []
    for row in banners:
        data.append({'name': row['banner_name'], 'id': row['id'],
                     'code': row['code'], 'faction': row['faction'], 'image': row['image_filename']})
    return jsonify(data)


@bp.route('/')
def index():
    return render_template('banners/index.html')
