from aiohttp.client import request
from app import app
from flask import render_template, request
from services.bse import search_stocks

@app.route("/stock-finder", methods=['GET', 'POST'])
async def stock_finder():
	if request.method == 'POST':
		form = request.form.to_dict()
		mp = form['mp']
		mc = form['mc']
		data = await search_stocks(mc, mp)
		return render_template("stock_finder.html", data=data)

	return render_template("stock_finder.html")