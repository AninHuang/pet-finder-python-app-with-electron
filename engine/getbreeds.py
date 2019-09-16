import requests
import sys
import json
from apikey import headers

# 取得命令列引數
# python getbreeds.py dog
pet_type = sys.argv[1]

# 取得動物的全部品種
def get_breeds(pettype):
    # GET https://api.petfinder.com/v2/types/{type}/breeds
    BASE_URL = 'https://api.petfinder.com/v2/types/' + pettype + '/breeds'

    response = requests.get(BASE_URL, headers=headers)
    return json.dumps(response.json()['breeds'])


print(get_breeds(pet_type))







# sys.stdout.flush()
# Linux -> for loop 一秒輸出一個
# Windows 系統下無影響
