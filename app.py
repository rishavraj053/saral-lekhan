import hashlib
import requests
import json
from flask import Flask, render_template, url_for, redirect, request

app = Flask(__name__)

@app.route('/admin', methods=['POST', 'GET'])
def verifyUser():
    return render_template('login.html')

@app.route('/admin-dashboard')
def dashboard():
    return render_template('admin-dashboard.html')

@app.route('/formal_email')
def formal_email():
    res = requests.get('https://saral-lekhan.000webhostapp.com/getCategory.php?type_id=1')
    res = res.json()
    print(res)
    return render_template('formal_email.html', category_info=res)
    # return render_template('formal_email.html')

@app.route('/')
def index():
    return render_template('index.html')
    # res = requests.get('https://saral-lekhan.000webhostapp.com/getTypeInfo.php')
    # res = res.json()
    # print(res)
    # return render_template('add-email.html', type_info=res, category_info=[])

if __name__ == '__main__':
    app.run(debug=True)