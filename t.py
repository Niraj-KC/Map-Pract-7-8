import requests

url = "https://www.knowyourgst.com/gstin-management/returnapi/?gstin=05AAACH2702H2Z5&fy=2022-23"

payload = {}
headers = {
    'passthrough': 'NjAyNTI0Mzc3NQ'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)