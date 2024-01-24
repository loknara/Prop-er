from flask import Flask, request, jsonify
from flask_cors import CORS
from nba_api.stats.static import players

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])




@app.route("/")
def hello_world():
    return "<p>Home Page</p>"


@app.route("/box", methods=['GET', 'POST'])
def box():

    if request.method == 'POST':
        data = request.json
        search_query = data.get('search_query', '')  # Default to an empty string if key not found
        
        player_search_results = players.find_players_by_full_name(str(search_query))
        
        # print(search_query)
        # print(player_search_results)
        
        active_players = [player for player in player_search_results if player.get('is_active')]

        return jsonify(active_players)

    