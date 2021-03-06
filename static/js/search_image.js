d3 = d3version5;

d3.json("../static/data/recipe_url.json").then((data) => {
  // Pick random 7 indexes and retrive picture url
  var limit = 7,
    amount = 7,
    lower_bound = 0,
    upper_bound = data.length,
    picked_number_list = [];

  // Pick random unigit que 7 numbers
  if (amount > limit) limit = amount;
  while (picked_number_list.length < limit) {
    var random_number = Math.floor(Math.random() * (upper_bound - lower_bound));
    if (picked_number_list.indexOf(random_number) == -1) {
      picked_number_list.push(random_number);
    }
  }

  picked_number_list.forEach((i) => {
    // Retrieve recipe image and recipe name based on 7 uniquely chosen numbers
    var index = picked_number_list.indexOf(i);
    picked_image = Object.values(data[i])[0]["recipe_img"];
    picked_name = Object.values(data[i])[0]["name"];

    // Bind retrived image url and id
    var pic_ids = d3.selectAll("#pic")
    var pic_ids_src = pic_ids._groups[0][index];
    pic_ids_src.src = picked_image;

  });

  console.log(picked_number_list);

  d3.selectAll("#pic")
    .data(picked_number_list)
    .on('click', d => {
      // console.log(Object.values(data[d])[0]["name"]);
      document.getElementById("recipe_name").value = Object.values(data[d])[0]["name"]
    })
});
