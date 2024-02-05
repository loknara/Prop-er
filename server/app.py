from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
from nba_api.stats.static import players

from nba_api.live.nba.endpoints import scoreboard
from nba_api.live.nba.endpoints import boxscore
from nba_api.stats.endpoints import playercareerstats, commonplayerinfo

app = Flask(__name__)
CORS(app)

with open('players.json', 'r') as json_file:
    players_data = json.load(json_file).get('players', [])

@app.route("/search", methods=['GET', 'POST'])
def box():
    if request.method == 'POST':
        data = request.json
        search_query = data.get('search_query', '').lower()

        player_search_results = [player for player in players_data if search_query in player.get('full_name', '').lower()]

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
def playerScore():
    if request.method == 'POST':
        data = request.json
        search_query = data.get('player_id', '')
        game = scoreboard.ScoreBoard()
        playerinfo = commonplayerinfo.CommonPlayerInfo(
            player_id=str(search_query))
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
def scoreboardFunc():
    games = scoreboard.ScoreBoard()
    data2 = games.get_dict()
    return jsonify(data2)


@app.route('/updatePlayers', methods=['GET', 'POST'])
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
