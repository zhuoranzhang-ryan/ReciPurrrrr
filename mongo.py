import os
import pandas as pd
import numpy as np
import random
import json
import pymongo
from pymongo import MongoClient
import dns
import re


# Set up connection to interaction database
conn_interaction = 'mongodb+srv://ryan:ryan@cluster0-nt08n.mongodb.net/ReciPurrrr'
client_interaction = pymongo.MongoClient(conn_interaction)
db_interaction = client_interaction.ReciPurrrr
collection_interaction = db_interaction.metadata

# Set up connection to recipe database
conn_recipe = 'mongodb+srv://ryan:recipurrrrr_mongoDB@cluster0-os0o2.mongodb.net/recipurrrrr'
client_recipe = pymongo.MongoClient(conn_recipe)
db_recipe = client_recipe.recipurrrrr

collection_recipe = db_recipe.recipes

def query_recipe(id):
    
    output_recipe = collection_recipe.find_one({'recipe_id':id})
    print('Recipe found!!!')

    return output_recipe

def query_interaction(id):
    
    output_interaction = collection_interaction.find_one({'recipe_id':id})
    print('Interactions found!!!')

    return output_interaction

def remove(string):
    return string.replace(" ", "%20")

def paragraph_preprocessing(text):
    text = re.sub("  ", ".", text)
    print(text)
    text = text.split(".")
    clean = [sentence.strip().capitalize() for sentence in text]
    result = ". ".join(clean)
    return result

def get_recipe_info(recipe, interaction, jpg_url):

    recipe_dict = dict()
    recipe_dict['recipe_id'] = recipe['recipe_id']
    recipe_dict['prep_time'] = recipe['prep_time']
    recipe_dict['nutrition_info'] = recipe['nutrition_info']
    recipe_dict['prep_steps'] = recipe['prep_steps']
    recipe_dict['description'] = paragraph_preprocessing(recipe['description'])
    recipe_dict['recipe_name'] = recipe['recipe_name'].capitalize()
    recipe_dict['ingredients'] = recipe['ingredients']
    recipe_dict['rating'] = interaction['rating']
    recipe_dict['review'] = interaction['review']
    if jpg_url != None:
        recipe_dict['jpg_url'] = remove(jpg_url)
    else:
         recipe_dict['jpg_url'] = 'static/figure/cat_chef.jpg'

    print("Recipe_dict ready!!!!!")

    return recipe_dict