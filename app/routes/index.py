from app import app
from flask import render_template, request
import pandas as pd
from services.bse import get_top_10_movers

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home", methods=['GET', 'POST'])
async def home():
    if request.method == "POST":
        losers, gainers = await get_top_10_movers()
        data = {
            'gainers': gainers,
            'losers': losers
        }
        
        return render_template("home.html", data=data)
    else:
        return render_template("home.html")