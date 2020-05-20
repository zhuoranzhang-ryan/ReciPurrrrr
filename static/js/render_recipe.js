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

        // step_div = d3.select('.steps')

        // let steps = JSON.parse(recipe['prep_steps']);
        // console.log(steps);
        // steps.forEach(d => 
        //     // step_div.append('ul').text(d)
        //     console.log(d)
        // )

        // popup.select('.steps').selectAll('ul')
        //      .data(recipe['prep_steps'])
        //      .enter()
        //      .text(d)
            //  .html(`Cooking instructions:<br>${recipe['prep_steps']}`);


        popup.select('.ingredients').text(recipe['ingredients']);
        popup.select('.prep_time').text("Preparation time: " + recipe['prep_time'] + " minutes");

    })

}