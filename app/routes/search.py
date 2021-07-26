from app import app
from flask import render_template

@app.route("/stock-finder")
def stock_finder():
	return render_template("stock_finder.html")