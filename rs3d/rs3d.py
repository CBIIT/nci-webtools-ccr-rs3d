from flask import Flask, request
import json
import argparse

app = Flask(__name__)

@app.route('/Rs3dRest/root')
def root():
    return ""

@app.route('/Rs3dRest/processData', methods = ['POST'])
def processData():
    # Process Files
    files = request.files
    print len(files)
    keys = []
    for file in files:
        files[file].save("/tmp/rs3d/"+files[file].filename)

    parameters = request.form
    satValue = parameters['sat']
    nrsValue = parameters['nrs']
    noiValue = parameters['noi']

    print parameters

    with open('/tmp/rs3d/result.txt', 'w') as f:
        f.write(satValue + '\n')
        f.write(nrsValue+ '\n')
        f.write(noiValue)
    
    return "Success"

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", dest="port_number", default="9150", help="Sets the Port") 
    args = parser.parse_args()
    port_num = int(args.port_number)    
    app.run(host='0.0.0.0', port=port_num, use_evalex = False) 
