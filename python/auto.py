import pymongo
import datetime

client = pymongo.MongoClient("112.74.57.41", 27017)
db = client.lotapp

for document in db.filters.find():
    filter = document

today = datetime.datetime.now().strftime("%Y-%m-%d")

query = [{
    "$lookup": {
      "from": "asias",
      "localField": "id",
      "foreignField": "gameId",
      "as": "details"
    }
  }, {
    "$unwind": "$details"
  }, {
    "$match": {
      "$and": [{

        "date": today,
        "details.startHost": {
          "$gte": filter["startHostFrom"],
          "$lte": filter["startHostTo"]
        },
        "details.startPanko": filter["startPanko"],
        "details.startGuest": {
          "$gte": filter["startGuestFrom"],
          "$lte": filter["startGuestTo"]
        },
        "details.endHost": {
          "$gte": filter["endHostFrom"],
          "$lte": filter["endHostTo"]
        },
        "details.endPanko": filter["endPanko"],
        "details.endGuest": {
          "$gte": filter["endGuestFrom"],
          "$lte": filter["endGuestTo"]
        },
        "details.nowHost": {
          "$gte": filter["nowHostFrom"],
          "$lte": filter["nowHostTo"]
        },
        "details.nowPanko": filter["nowPanko"],
        "details.nowGuest": {
          "$gte": filter["nowGuestFrom"],
          "$lte": filter["nowGuestTo"]
        },
        "details.euroAsiaHost": {
          "$gte": filter["euroAsiaHostFrom"],
          "$lte": filter["euroAsiaHostTo"]
        },
        "details.euroAsiaPanko": filter["euroAsiaPanko"],
        "details.euroAsiaGuest": {
          "$gte": filter["euroAsiaGuestFrom"],
          "$lte": filter["euroAsiaGuestTo"]
        }

      }]
    }
  }, {
    "$project": {
      "fullname": {
        "$concat": ["$type", " ", "$date", " ", "$time", " ", "$host", " VS ", "$guest"]
      },
      "id": "$_id",
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
      "_id": "$id",
      "details": {
        "$push": "$$ROOT"
      }
    }
  }
]
print(query)
result = db.games.aggregate(query)
for document in result:
  db.result.insert(document)