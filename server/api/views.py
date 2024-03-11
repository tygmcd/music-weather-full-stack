from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from openai import OpenAI
import json

@api_view(['POST'])
def generate_songs(request):
    client = OpenAI()

    system_prompt = '''
                    You are an expert at recommending songs based on the current weather conditions.
                    You analyze complex JSON weather data and then recommend 5 songs based on that data.
                    You must come up with 5 unique songs for every set of data and should not include songs
                    that explicity include any of the weather data in its title (ex : Walking on Sunshine, sunny).
                    DO NOT REPEAT SONGS
                    Please output JSON in the following format {"songs": {"title" : x, "artist" : y}}, the weather data 
                    does not need to be included in your response.
                    '''

    user_prompt = "What are 5 good songs that I should listen to given these weather conditions?" + str(request.body)

    completion = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=1.5
    )

    resp_json = json.loads(completion.choices[0].message.content)
    print(resp_json)
    print(type(resp_json))
    return Response(resp_json)
