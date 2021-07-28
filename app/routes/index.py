from app import app
from flask import render_template
import pandas as pd

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home")
def home():
    df = pd.read_csv('app/data/Equity.py')
    df = df.drop(['Face Value', 'Instrument', 'Group', 'Industry', 'Security Name', "ISIN No"], axis=1)
    df = df.to_dict(orient='records')
    return render_template("home.html", data=df)