from flask import Flask, request, jsonify, make_response, send_from_directory
from flask_cors import CORS, cross_origin
import json
import os
from nba_api.stats.static import players

from nba_api.live.nba.endpoints import scoreboard
from nba_api.live.nba.endpoints import boxscore
from nba_api.stats.endpoints import playercareerstats, commonplayerinfo

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)

with open('players.json', 'r') as json_file:
    players_data = json.load(json_file).get('players', [])


@app.route("/search", methods=['GET', 'POST'])
@cross_origin()
def box():
    if request.method == 'POST':
        data = request.json
        search_query = data.get('search_query', '').lower()

        player_search_results = [
            player for player in players_data if search_query in player.get('full_name', '').lower()]

        return jsonify(player_search_results)
# def box():
#     if request.method == 'POST':
#         data = request.json
#         search_query = data.get('search_query', '')

#         player_search_results = players.find_players_by_full_name(
#             str(search_query))
#         active_players = [
#             player for player in player_search_results if player.get('is_active')]
#         print(active_players)

#         return jsonify(active_players)


@app.route("/playerscore", methods=['GET', 'POST'])
@cross_origin()
def playerScore():
    if request.method == 'POST':
        data = request.json
        search_query = data.get('player_id', '')
        game = scoreboard.ScoreBoard()
        custom_headers = {
            'Host': 'stats.nba.com',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
        }

# Timeout Settings
        timeout = 100  # Timeout in seconds

# API Call with Custom Headers and Timeout
        playerinfo = commonplayerinfo.CommonPlayerInfo(
            player_id=str(search_query),
            headers=custom_headers,
            timeout=timeout
        )
        load_player_info = playerinfo.get_dict()
        load_result_set = load_player_info['resultSets'][0]
        teamId = load_result_set['rowSet'][0][18]

        def find_teams_in_games(data, teamIds):

            tempARR = []
            tempARR.clear()
            for game in data['scoreboard']['games']:
                home_team_id = game['homeTeam']['teamId']
                away_team_id = game['awayTeam']['teamId']

                if (home_team_id == teamIds):
                    tempARR.insert(0, game['gameId'])
                    tempARR.insert(1, 1)
                    return tempARR
                if (away_team_id == teamIds):
                    tempARR.insert(0, game['gameId'])
                    tempARR.insert(1, 0)
                    return tempARR

        load_todays_games = game.get_dict()
        load_game_id = find_teams_in_games(load_todays_games, teamId)

        def find_player_in_game(data, playerId, flag):
            if flag == 1:
                for players in data['homeTeam']['players']:
                    personId = players['personId']
                    if playerId == personId:
                        test = players['statistics']
                        return test
            else:
                for players in data['awayTeam']['players']:
                    personId = players['personId']
                    if playerId == personId:
                        test = players['statistics']
                        return test

    try:
        load_boxscore = boxscore.BoxScore(str(load_game_id[0]))
        load_team = load_boxscore.game.get_dict()
        player_stats = find_player_in_game(
            load_team, search_query, load_game_id[1])
        tData = {
            'stat': player_stats,
            'gameId': load_game_id[0],
            'homeaway': load_game_id[1]
        }
        return jsonify(tData)
    except:
        print("Player not playing or information not available yet")
        return make_response(jsonify({"message": "Player not playing or information not available yet"}), 400)


@app.route('/scoreboard', methods=['GET'])
@cross_origin(origins=["https://prop-er-eebf42685c52.herokuapp.com"])
def scoreboardFunc():
    games = scoreboard.ScoreBoard()
    data2 = games.get_dict()
    return jsonify(data2)


@app.route('/updatePlayers', methods=['GET', 'POST'])
@cross_origin()
def updatePlayers():
    if request.method == 'POST':
        data = request.json
        player_query = data.get('player_id', '')
        game_query = data.get('game_id', '')
        home_query = data.get('home_id', '')

        print(player_query)

        def find_player_in_game(data, playerId, flag):
            if flag == 1:
                for players in data['homeTeam']['players']:
                    personId = players['personId']
                    if playerId == personId:
                        test = players['statistics']
                        return test
            else:
                for players in data['awayTeam']['players']:
                    personId = players['personId']
                    if playerId == personId:
                        test = players['statistics']
                        return test

    try:
        load_boxscore = boxscore.BoxScore(str(game_query))
        # load_boxscore = boxscore.BoxScore(game_id='0022000196')
        load_team = load_boxscore.game.get_dict()
        player_stats = find_player_in_game(load_team, player_query, home_query)
        tData = {
            'stat': player_stats,
            'gameId': game_query,
            'homeaway': home_query

        }
        return jsonify(tData)
    except:
        print("Player not playing or information not available yet")
        return make_response(jsonify({"message": "Player not playing or information not available yet"}), 400)


@app.route('/api', methods=['GET'])
@cross_origin()
def index():
    return {
        "tut": "flask lol"
    }


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run()
