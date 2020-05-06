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


@bp.route('/add_banner', methods=['POST'])
def add_banner():
    if request.method == 'POST':
        banner_name = request.form['banner-name']
        banner_code = request.form['banner-code']
        banner_faction = request.form['banner-faction']
        banner_image_name = None

        if request.form['file-url']:
            banner_image_name = download_from_url()

        if banner_image_name and banner_faction and banner_code and banner_name:
            db = get_db()
            db.execute(
                'INSERT INTO banner (banner_name, code, image_filename, faction) '
                'VALUES (?,?,?,?)', (banner_name, banner_code, banner_image_name, banner_faction))
            db.commit()
            flash('Banner added.', category='success')
    return redirect(url_for('banners.index'))


def download_from_url():
    url = request.form['file-url']
    filename = urlparse(url).path.split('/')[-1]

    # check file for illegal filetypes
    if not allowed_file(filename):
        flash('file not allowed.')
        return None

    filename = secure_filename(filename)  # make sure filename is safe
    path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    with current_app.open_instance_resource(path, 'wb') as f:
        response = requests.get(url, stream=True)
        if not response.ok:
            flash("Couldn't download specified file.", 'error')
            return None

        # Write to file
        for block in response.iter_content(1024):
            if not block:
                break
            f.write(block)
    return filename


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower(
           ) in current_app.config["ALLOWED_EXTENSIONS"]
