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
        // d3.select('#popup')
        console.log(recipe);

    })

}