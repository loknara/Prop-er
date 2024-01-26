from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
from nba_api.stats.static import players
from nba_api.live.nba.endpoints import scoreboard
from nba_api.live.nba.endpoints import boxscore
from nba_api.stats.endpoints import playercareerstats, commonplayerinfo

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])




@app.route("/")
def hello_world():
    return "<p>Home Page</p>"


@app.route("/search", methods=['GET', 'POST'])
def box():

    if request.method == 'POST':
        data = request.json
        search_query = data.get('search_query', '')  # Default to an empty string if key not found
        
        player_search_results = players.find_players_by_full_name(str(search_query))
        
        # print(search_query)
        # print(player_search_results)
        
        active_players = [player for player in player_search_results if player.get('is_active')]

        return jsonify(active_players)
    


@app.route("/playerscore", methods=['GET', 'POST'])
def playerScore():
    if request.method == 'POST':
        data = request.json
        search_query = data.get('player_id', '')
        game = scoreboard.ScoreBoard()
        print(search_query)

        playerinfo = commonplayerinfo.CommonPlayerInfo(player_id=str(search_query))#player_id=str(search_query)
        load_player_info = playerinfo.get_dict()
        load_result_set = load_player_info['resultSets'][0]
        teamId = load_result_set['rowSet'][0][18]

        def find_teams_in_games(data, teamIds):
            # Iterate through each game in the data
            
            tempARR = []
            tempARR.clear()
            for game in data['scoreboard']['games']:
                home_team_id = game['homeTeam']['teamId']
                away_team_id = game['awayTeam']['teamId']

                # Check if the home or away team's ID is in the list of team_ids
                if (home_team_id == teamIds) :
                    tempARR.insert(0,game['gameId'])
                    tempARR.insert(1,True)
                    return tempARR
                if (away_team_id == teamIds):
                    tempARR.insert(0,game['gameId'])
                    tempARR.insert(1,False)
                    return tempARR
                
        load_todays_games = game.get_dict()
        load_game_id = find_teams_in_games(load_todays_games, teamId)

        def find_player_in_game(data, playerId, flag):
            if flag:
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
        # print("here")
        load_boxscore = boxscore.BoxScore(str(load_game_id[0]))
        load_team = load_boxscore.game.get_dict()
        # print("here2")
        player_stats = find_player_in_game(load_team, search_query, load_game_id[1])
        tData = {
            'stat' : player_stats,
            'gameId' : load_game_id[0]
        }
        print(tData)
        # json_str = json.dumps(tData)
        # print(json_str)
        # print("here3")
        # print(player_stats)
        return jsonify(tData)  # Return the player statistics to the frontend
    except:
        print("Player not playing or information not available yet")
        # return jsonify({"message": "Player not playing or information not available yet"})  # Return a message to the frontend
        return make_response(jsonify({"message": "Player not playing or information not available yet"}), 400)


@app.route('/scoreboard', methods = ['GET'])
def scoreboardFunc():
    games = scoreboard.ScoreBoard()
    data2 = games.get_dict()
    return jsonify(data2)