from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time
from bs4 import BeautifulSoup
from game import  Game
import re
import json
from json import JSONEncoder
from random import randint
import pymongo


client = pymongo.MongoClient("localhost", 27017)
db = client.lotapp
caps = DesiredCapabilities.PHANTOMJS
caps["phantomjs.page.settings.userAgent"] = str(randint(0,1000000))
driver = webdriver.PhantomJS(executable_path="/Users/Alex/apps/phantomjs-2.1.1-macosx/bin/phantomjs",desired_capabilities=caps)

def obj_dict(obj):
    if isinstance(obj, Game):
        return obj.__dict__

#driver.get("http://live.titan007.com")
driver.get("http://live.titan007.com/index2in1.aspx?id=8")
time.sleep(5)
print(driver.page_source)  # 这个函数获取页面的html
driver.get_screenshot_as_file("2.jpg")  # 获取页面截图
soup = BeautifulSoup(driver.page_source,"lxml", from_encoding="utf-8")
try:
    table = soup.find('table', id='table_live')
    td_th = re.compile('t[dh]')
    date = table.findAll("tr")[0].findAll(td_th)[1].find(text=True)
    games = []
    rownum = 0
    for row in table.findAll("tr"):
        cells = row.findAll(td_th)
        if len(cells) > 2:
            if rownum == 0:
                rownum+=1
                continue
            gameid = row.attrs['id'][4:]
            games.append(Game(date, cells[1].find(text=True), cells[2].find(text=True), cells[3].find(text=True), cells[4].find(text=True), cells[6].find(text=True), cells[8].find(text=True), cells[9].find(text=True), cells[10].find(text=True), gameid))
        rownum +=1

    # data = json.dumps(games, default=obj_dict, ensure_ascii=False, indent=4)
    for item in games:
        db.games.insert(item.__dict__)
    # data = json.dumps(games, default=lambda o: o.__dict__, ensure_ascii=False, sort_keys=True, indent=4)
    # db.games.insert_many(data)

except AttributeError as e:
    print(e)

driver.close()