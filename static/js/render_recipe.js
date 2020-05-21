function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
    console.log("toggling");
}

function show_recipe(index) {
    
    console.log(index);

    d3.json("../static/data/top3_data.json").then((data) => {
        
        let recipe = data[index];
        console.log(recipe);
        
        popup = d3.select('#popup');
        popup.select('h2').text(recipe['recipe_name']);

        ingredients_div = d3.select('.ingredients')
        ingredients_div.html("")
        ingredients_div.append('h3').text('Ingredients')
        let ingredients = eval(recipe['ingredients'])
        console.log(ingredients);
        ingredients.forEach(d => ingredients_div.append('span').text(d+" / "))
        // ingredients_div.append('span').text(ingredients)

        step_div = d3.select('.steps')
        step_div.html('')
        step_div.append('h3').text('Instructions')
        let steps = eval(recipe['prep_steps']);
        steps.forEach(d => 
            step_div.append('li').text(d[0].toUpperCase()+d.slice(1,-1)+'.')
        );
        popup.select('.prep_time').text("Preparation time: " + recipe['prep_time'] + " minutes");
    })

}