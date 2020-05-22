from flask import Flask, request, redirect, render_template, jsonify
import json
# from flask_pymongo import PyMongo
import search
import mongo
import scrape_image
import numpy as np

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

selection = ["Recipe_One", "Recipe_Two", "Recipe_Three"]
desc = ["Description_one", "Description_two", "Description_three" ]

# Open a browser in the background for webscraping
browser = scrape_image.init_browser()

# @app.route('/')
# def index():

#     return render_template('index.html', top1=selection[0], 
#                                          top2=selection[1], 
#                                          top3=selection[2],
#                                          desc1=desc[0],
#                                          desc2=desc[1],
#                                          desc3=desc[2],)

@app.route('/')
def index():

    # Grab user's query input
    # Select the top 3 recipes and store their id in selection
    # query = request.form['query']
    # selection = search.get_selection_top3(query)
 
    
    recipe_data = list()
    f = open("static/data/recipe_url.json") 
    recipe_url = json.load(f) 
    f.close()
    selection = np.random.randint(0, len(recipe_url)+1 ,3)

    for recipe_id in selection:

        search_id = int(list(recipe_url[int(recipe_id)].keys())[0])
        recipe = mongo.query_recipe(search_id)
        interaction = mongo.query_interaction(search_id)
        # jpg_url = scrape_image.scrape_image(int(recipe_id), browser)

        jpg_url = list(recipe_url[int(recipe_id)].values())[0]['recipe_img']

        recipe_info = mongo.get_recipe_info(recipe, interaction, jpg_url)

        recipe_data.append(recipe_info)
    
        with open("static/data/top3_data.json", 'w') as f:
            json.dump(recipe_data, f)
            print(f"JSON file ready for {recipe_id}!!!!")
    

    return render_template('index.html', top1=recipe_data[0]['recipe_name'], 
                                        top2=recipe_data[1]['recipe_name'], 
                                        top3=recipe_data[2]['recipe_name'],
                                        desc1=recipe_data[0]['description'],
                                        desc2=recipe_data[1]['description'],
                                        desc3=recipe_data[2]['description'],
                                        pic1=recipe_data[0]['jpg_url'],
                                        pic2=recipe_data[1]['jpg_url'],
                                        pic3=recipe_data[2]['jpg_url'],
                                        )                                       


@app.route('/search_recipe', methods=['POST'])

def search_recipe():

    # Grab user's query input
    # Select the top 3 recipes and store their id in selection
    query = request.form['query']
    selection = search.get_selection_top3(query)

    recipe_data = list()

    for recipe_id in selection:

        recipe = mongo.query_recipe(int(recipe_id))
        interaction = mongo.query_interaction(int(recipe_id))
        jpg_url = scrape_image.scrape_image(int(recipe_id), browser)

        recipe_info = mongo.get_recipe_info(recipe, interaction, jpg_url)

        recipe_data.append(recipe_info)
    
        with open("static/data/top3_data.json", 'w') as f:
            json.dump(recipe_data, f)
            print(f"JSON file ready for {recipe_id}!!!!")
    

    return render_template('index.html', top1=recipe_data[0]['recipe_name'], 
                                        top2=recipe_data[1]['recipe_name'], 
                                        top3=recipe_data[2]['recipe_name'],
                                        desc1=recipe_data[0]['description'],
                                        desc2=recipe_data[1]['description'],
                                        desc3=recipe_data[2]['description'],
                                        pic1=recipe_data[0]['jpg_url'],
                                        pic2=recipe_data[1]['jpg_url'],
                                        pic3=recipe_data[2]['jpg_url'],
                                        )



if __name__ == '__main__':
    app.run(debug=True)