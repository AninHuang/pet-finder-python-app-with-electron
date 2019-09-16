import requests
import sys
import json
from apikey import headers

# python petfinder.py dog Akita young
pet_type = sys.argv[1]
pet_breed = sys.argv[2]
pet_age = sys.argv[3]

def get_pets(pettype, breed, age):
    # GET https://api.petfinder.com/v2/animals?type=dog&breed=Akita&age=young
    BASE_URL = 'https://api.petfinder.com/v2/animals'

    params = {
        'type': pettype,
        'breed': breed,
        'age': age
    }

    response = requests.get(BASE_URL, headers=headers, params=params)
    data = response.json()['animals']
    genders = count_genders(data)

    return json.dumps({"data": data, "genders": genders})


def count_genders(data):
    male_count = 0

    for pet in data:
        if pet['gender'] == 'Male':
            male_count += 1

    return [male_count, (len(data)-male_count)]


print(get_pets(pet_type, pet_breed, pet_age))



# sys.stdout.flush()
