from flask import Flask

app = Flask(__name__)

from app.routes import index
from app.routes import search
from app.routes import bse