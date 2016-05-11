import json
import math
import os
import rpy2.robjects as robjects
import smtplib
import time
import logging

from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from PropertyUtil import PropertyUtil
from stompest.async import Stomp
from stompest.async.listener import DisconnectListener, SubscriptionListener
from stompest.config import StompConfig
from stompest.protocol import StompSpec
from twisted.internet import reactor, defer

class RequestProcessor(DisconnectListener):
  CONFIG = 'queue.config'
  NAME = 'queue.name'
  URL = 'queue.url'
  UPLOAD_FOLDER = 'rs3d.folder.upload'

  def consume(self, client, frame):
    parameters = json.loads(frame.body)
    print 'in queue call back function'
    print parameters['sat']
    print parameters['nrs']
    print parameters['noi']
    print parameters['file1']
    print parameters['file2']
    print parameters['file3']

  @defer.inlineCallbacks
  def run(self):
    client = yield Stomp(self.CONFIG[RequestProcessor.CONFIG]).connect()
    headers = {
      # client-individual mode is necessary for concurrent processing (requires ActiveMQ >= 5.2)
      StompSpec.ACK_HEADER: StompSpec.ACK_CLIENT_INDIVIDUAL,
      # the maximal number of messages the broker will let you work on at the same time
      'activemq.prefetchSize': '100',
    }
    client.subscribe(self.CONFIG[RequestProcessor.NAME], headers, listener=SubscriptionListener(self.consume))
    client.add(listener=self)

  def onConnectionLost(self,connect,reason):
    self.run()

  def __init__(self):
    config = PropertyUtil(r"config.ini")
    config[RequestProcessor.CONFIG] = StompConfig(uri="failover:("+config.getAsString(RequestProcessor.URL)+")?startupMaxReconnectAttempts=-1,initialReconnectDelay=300000")
    self.CONFIG = config

if __name__ == '__main__':
  logging.basicConfig(level=logging.INFO)
  RequestProcessor().run()
  reactor.run()
