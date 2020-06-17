import requests 
urlString = "http://localhost:7778/postTest"
  
name = "XXXXXXXXXXXXXXXXX"
  
mydata = {'postResponseData':name, 
        'moreData':'yes more', 
        'data more2':'from response'} 
  
myrequests = requests.post(url = urlString, data = mydata) 
  
responseData = myrequests.text 
print("reponse::%s"%responseData)
