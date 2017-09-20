[{
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
      "date": "2017-09-17",
      "details.startHost": {
        "$gte": "0.77",
        "$lte": "0.83"
      },
      "details.startPanko": "一球",
      "details.startGuest": {
        "$gte": "0.90",
        "$lte": "1.28"
      },
      "details.endHost": {
        "$gte": "0.77",
        "$lte": "0.90"
      },
      "details.endPanko": "一球",
      "details.endGuest": {
        "$gte": "0.90",
        "$lte": "1.28"
      },
      "details.nowHost": {
        "$gte": "0.77",
        "$lte": "0.90"
      },
      "details.nowPanko": "一球",
      "details.nowGuest": {
        "$gte": "0.90",
        "$lte": "1.28"
      },
      "details.euroAsiaHost": {
        "$gte": "0.77",
        "$lte": "0.98"
      },
      "details.euroAsiaPanko": "一球",
      "details.euroAsiaGuest": {
        "$gte": "0.90",
        "$lte": "1.28"
      }
    }]
  }
}, {
  "$project": {
    "fullname": {
      "$concat": ["$type", " ", "$date", " ", "$time", " ", "$host", " VS ", "$guest"]
    },
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
}, {
  "$group": {
    "_id": "$fullname",
    "details": {
      "$push": "$$ROOT"
    }
  }
}]