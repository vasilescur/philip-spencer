import os
import sys
import json

from urllib.parse import urlencode
from urllib.request import Request, urlopen

from flask import Flask, request

app = Flask(__name__)

PLEDGES_MESSAGE = ''

@app.route('/', methods=['POST'])
def webhook():
  data = request.get_json()
  log('Recieved {}'.format(data))

  # We don't want to reply to ourselves!
  if data['name'] != 'Philip Spencer':
    name : str = data['name']
    text : str = data['text']

    if text.find('@pledges') != -1:
      msg = 'pledge list goes here'

    send_message(msg)

  return "ok", 200


def send_message(msg):
  url  = 'https://api.groupme.com/v3/bots/post'

  data = {
          'bot_id' : os.getenv('GROUPME_BOT_ID'),
          'text'   : msg,
         }
  request = Request(url, urlencode(data).encode())
  json = urlopen(request).read().decode()
  
def log(msg):
  print(str(msg))
  sys.stdout.flush()



if __name__ == "__main__":
  print('Getting user list: ')

  TOKEN = 'ss2godUQolTMd5s9MJJaMSe2zVVkePhuKP3ClClS'
  url  = f'https://api.groupme.com/v3/groups?token={TOKEN}'

  data = {
            #'bot_id' : '82b28a0e24370f719dd17302d6', #os.getenv('GROUPME_BOT_ID'),
            #'id'   : "56980853",
            'name': 'Chi Blender-gate'
         }
  request = Request(url, urlencode(data).encode())
  json = urlopen(request).read().decode()

  print('Result: ')
  print(json)