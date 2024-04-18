from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello world!'
