from app import app
from flask import render_template

@app.route("/bse-chart")
def bse_chart():
	return render_template("index.html")