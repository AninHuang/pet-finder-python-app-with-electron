import requests
import sys
import json

pet_type = sys.argv[1]
pet_breed = sys.argv[2]
pet_age = sys.argv[3]

data = {
    'grant_type': 'client_credentials',
    'client_id': 'KMk81iy5ckhe80bghqS0ZCOEnjl8pFqOeTjvM1RpLVbO7SHnTX',
    'client_secret': 'SccFwTjSHg8WrtzYncbE79xOl0lWOqnA6TskOAf4'
}

result = requests.post('https://api.petfinder.com/v2/oauth2/token', data=data)
access_token = result.json()['access_token']

def get_breeds(pettype):
    BREEDS_BASE_URL = 'https://api.petfinder.com/v2/types/'

    headers = {
        'Authorization': 'Bearer ' + access_token,
    }

    response = requests.get(BREEDS_BASE_URL + pettype + '/breeds', headers=headers)
    return response.json()['breeds']


def get_pets(pettype, breed, age):
    ALL_BASE_URL = 'https://api.petfinder.com/v2/animals'

    headers = {
        'Authorization': 'Bearer ' + access_token,
    }

    params = {
        'type': pettype,
        'breed': breed,
        'age': age
    }

    response = requests.get(ALL_BASE_URL, headers=headers, params=params)
    # json_data = json.loads(response.text)
    # response.json()['animals']
    return json.dumps(response.json()['animals'])


print(get_pets(pet_type, pet_breed, pet_age))
sys.stdout.flush()
