import twitter


consumer_key='OE9sqOFBMePsvkz9bwB78HCV1'  
consumer_secret='aa1gukjExpgD09eUw7ZCIPH89eeT8KYAQRa8VRiQ4CDDiIzyPR'  
access_token_secret='lMiSw8k3ZSIKnGjwdQSkLVKjh5D4s1waiuIRenRdRqGf3'  
access_token='34075741-cSUlEEcdEr8ao0fx8s0v2Tvk8CJMuWBwvtm57S1Lp'  

api = twitter.Api(consumer_key=consumer_key,                                           
                       consumer_secret=consumer_secret,
                       access_token_key=access_token,
                       access_token_secret=access_token_secret)

since='2016-01-01'
until='2016-01-02'
lang='en'
max_count=100
term='pms'
#raw_query="q=%23{term}%20lang%3A{lang}%20since%3A{since}%20until%3A{until}"
raw_query="q=%23{term}%20lang%3A{lang}"

# since until will fail if it's more than 6-9 days in the past for search :(
# https://twittercommunity.com/t/how-to-get-tweets-for-specific-date-duration/14775
#api.GetSearch(raw_query="q=pms&lang=en&since=2015-01-01&until=2015-01-02")

api.GetSearch(raw_query=raw_query.format(lang=lang, term=term), include_entities=True)

#
#api.GetSearch(raw_query="q=pms&lang=en&since=2015-01-01&until=2015-01-02")

api.GetSearch(term=term, count=max_count, lang=lang)

suggestion given twitter api access limits-->

real time PMS tracker! track PMS in your area :P