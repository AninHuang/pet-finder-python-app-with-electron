import requests

data = {
    'grant_type': 'client_credentials',
    'client_id': 'KMk81iy5ckhe80bghqS0ZCOEnjl8pFqOeTjvM1RpLVbO7SHnTX',
    'client_secret': 'SccFwTjSHg8WrtzYncbE79xOl0lWOqnA6TskOAf4'
}

# 取得 token
result = requests.post('https://api.petfinder.com/v2/oauth2/token', data=data)
access_token = result.json()['access_token']

headers = {
    'Authorization': 'Bearer ' + access_token,
}