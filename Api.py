from firebase import firebase
from SleepModelSDGP import predictedValue
import json

firebase = firebase.FirebaseApplication('https://cerebrex-101.firebaseio.com', None)
lis = [4.79415228, 4.10495117]
result = firebase.get('/Results', None)
another = firebase.post('/Results', {'prediction': str(predictedValue(lis)[0])})

for key,value in result.items():
    print(value)

with open('data_file.json', 'r') as fp:
    obj = json.load(fp)
    obj = json.loads("""{
      "firstName": "Alice",
      "lastName": "Hall",
      "age": 35
    }""")
    firstName = obj["firstName"]
    print(firstName)