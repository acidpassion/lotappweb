#!flask/bin/python
from flask import Flask, request, render_template
from pymongo import MongoClient
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
client=MongoClient("112.74.57.41", 27017)
db=client.lotapp
@app.route('/filter', methods=['GET','POST'])
def get_filter():
    if request.method == 'GET':
        filter = db.filters.find_one()
        filter.pop('_id')
        return json.dumps(filter, ensure_ascii=False, indent=4)
    elif request.method == 'POST':
        filter = db.filters.find_one()
        try:
            if filter is not None:
                db.filters.update_one(
                    {"_id": filter['_id']},
                    {
                        "$set": {
                            'startHostFrom': request.form['startHostFrom'],
                            'startHostTo': request.form['startHostTo'],
                            'startPanko': request.form['startPanko'],
                            'startGuestFrom': request.form['startGuestFrom'],
                            'startGuestTo': request.form['startGuestTo'],
                            'nowHostFrom': request.form['nowHostFrom'],
                            'nowHostTo': request.form['nowHostTo'],
                            'nowPanko': request.form['nowPanko'],
                            'nowGuestFrom': request.form['nowGuestFrom'],
                            'nowGuestTo': request.form['nowGuestTo'],
                            'endHostFrom': request.form['endHostFrom'],
                            'endHostTo': request.form['endHostTo'],
                            'endPanko': request.form['endPanko'],
                            'endGuestFrom': request.form['endGuestFrom'],
                            'endGuestTo': request.form['endGuestTo'],
                            'euroAsiaHostFrom': request.form['euroAsiaHostFrom'],
                            'euroAsiaHostTo': request.form['euroAsiaHostTo'],
                            'euroAsiaPanko': request.form['euroAsiaPanko'],
                            'euroAsiaGuestFrom': request.form['euroAsiaGuestFrom'],
                            'euroAsiaGuestTo': request.form['euroAsiaGuestTo']
                        }
                    }
                )
                return 'Filter saved!', 200
            else:
                db.filters.insert_one(request.form)
        except Exception as e:
            print(e)
            return 'Error when save the filter!', 500


@app.route('/games', methods=['GET','POST'])
def get_games():
    pinelines = [
        {
            "$lookup": {
                "from": "asias",
                "localField": "id",
                "foreignField": "gameId",
                "as": "details"
            }
         },
        {
            "$unwind": "$details"
        },
        {
            "$match": {
                "$and": [json.loads(request.data)]
            }
        },

        {
            "$project": {
                "fullname": {
                    "$concat": ["$type", " ", "$date", " ", "$time", " ", "$host", " VS ", "$guest"]
                },
                "company": "$details.company",
                "startHost": "$details.startHost",
                "startPanko": "$details.startPanko",
                "startGuest": "$details.startGuest",
                "nowHost": "$details.nowHost",
                "nowPanko": "$details.nowPanko",
                "nowGuest": "$details.nowGuest",
                "endHost": "$details.endHost",
                "endPanko": "$details.endPanko",
                "endGuest": "$details.endGuest",
                "euroAsiaHost": "$details.euroAsiaHost",
                "euroAsiaPanko": "$details.euroAsiaPanko",
                "euroAsiaGuest": "$details.euroAsiaGuest"
            }
        },
        {
            "$group": {
                    "_id": "$fullname",
                    "details": {
                    "$push": "$$ROOT"
                }
            }
        }
    ]
    result = list(db.fotapp.games.aggregate(pinelines))
    return json.dumps(result, indent=4), 200

if __name__ == '__main__':
    app.run(debug=True)