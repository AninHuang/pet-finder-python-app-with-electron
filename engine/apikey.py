import requests

data = {
    'grant_type': 'client_credentials',
    'client_id': 'test',
    'client_secret': 'test'
}

# 取得 token
result = requests.post('https://api.petfinder.com/v2/oauth2/token', data=data)
access_token = result.json()['access_token']

headers = {
    'Authorization': 'Bearer ' + access_token,
}
