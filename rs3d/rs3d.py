from flask import Flask, request
import json
import argparse
import os
from PropertyUtil import PropertyUtil
from stompest.config import StompConfig
from stompest.sync import Stomp

app = Flask(__name__)

class rs3d:
    UPLOAD_FOLDER = 'rs3d.folder.upload'
    QUEUE_NAME = 'queue.name'
    QUEUE_URL = 'queue.url'
    QUEUE_CONFIG = 'queue.config'


    @app.route('/Rs3dRest/root')
    def root():
        return ""

    @app.route('/Rs3dRest/processData', methods = ['POST'])
    def processData():
        # Process Files
        files = request.files
        print len(files)
        keys = []
        parameters = request.form
        param = {}
        for key in parameters: 
            param[key] = parameters[key]

        for file in files:
            files[file].save(os.path.join(app.config[rs3d.UPLOAD_FOLDER], files[file].filename))
            param[file] = files[file].filename
 
        try:
           client = Stomp(app.config[rs3d.QUEUE_CONFIG])
           client.connect()
           client.send(app.config[rs3d.QUEUE_NAME], json.dumps(param))
           client.disconnect()
           return "Success"
        except Exception as e:
           return "Failed"

    def __init__(self):
        rs3dConfig = PropertyUtil(r"config.ini")
        app.config[rs3d.UPLOAD_FOLDER] = rs3dConfig.getAsString(rs3d.UPLOAD_FOLDER)
        app.config[rs3d.QUEUE_CONFIG] = StompConfig(rs3dConfig.getAsString(rs3d.QUEUE_URL)) 
        app.config[rs3d.QUEUE_NAME] = rs3dConfig.getAsString(rs3d.QUEUE_NAME)  

if __name__ == '__main__':
    rs3d()
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", dest="port_number", default="9150", help="Sets the Port") 
    args = parser.parse_args()
    port_num = int(args.port_number)    
    app.run(host='0.0.0.0', port=port_num, use_evalex = False) 
