d3.json("../static/data/recipe_url.json").then((data) => {
  console.log("Working?");
  console.log(data.length);
  // Pick random 7 indexes and retrive picture url
  var picked_number_list = [];
  for (var i = 0; i < 7; i++) {
    var picked_number = Math.floor(Math.random() * data.length) + 1;

    if (!picked_number_list.includes(picked_number)) {
      picked_number_list.push(picked_number);
    } else {
      var picked_number = Math.floor(Math.random() * data.length) + 1;
      picked_number_list.push(picked_number);
    }
  }

  //   d3.selectAll("swiper-slide").forEach(function(getImage){
  //     var picked_image= Object.values(data[picked_number_list[0]])[0][
  //         "recipe_img"
  //       ];
  //     var picked_name = Object.values(data[picked_number_list[0]])[0]["name"];

  //   })

  var picked_image_1 = Object.values(data[picked_number_list[0]])[0][
    "recipe_img"
  ];
  var picked_name_1 = Object.values(data[picked_number_list[0]])[0]["name"];
  var picked_image_2 = Object.values(data[picked_number_list[1]])[0][
    "recipe_img"
  ];
  var picked_name_2 = Object.values(data[picked_number_list[1]])[0]["name"];
  var picked_image_3 = Object.values(data[picked_number_list[2]])[0][
    "recipe_img"
  ];
  var picked_name_3 = Object.values(data[picked_number_list[2]])[0]["name"];
  var picked_image_4 = Object.values(data[picked_number_list[3]])[0][
    "recipe_img"
  ];
  var picked_name_4 = Object.values(data[picked_number_list[3]])[0]["name"];
  var picked_image_5 = Object.values(data[picked_number_list[4]])[0][
    "recipe_img"
  ];
  var picked_name_5 = Object.values(data[picked_number_list[4]])[0]["name"];
  var picked_image_6 = Object.values(data[picked_number_list[5]])[0][
    "recipe_img"
  ];
  var picked_name_6 = Object.values(data[picked_number_list[5]])[0]["name"];
  var picked_image_7 = Object.values(data[picked_number_list[6]])[0][
    "recipe_img"
  ];
  var picked_name_7 = Object.values(data[picked_number_list[6]])[0]["name"];

  document.getElementById("pic1").src = picked_image_1;
  document.getElementById("pic2").src = picked_image_2;
  document.getElementById("pic3").src = picked_image_3;
  document.getElementById("pic4").src = picked_image_4;
  document.getElementById("pic5").src = picked_image_5;
  document.getElementById("pic6").src = picked_image_6;
  document.getElementById("pic7").src = picked_image_7;
  console.log(picked_number_list);

  var image_1 = d3.select("#pic1");
  image_1.on("click", function () {
    console.log("Pic1 is clicked!");
    console.log(picked_name_1);
    document.getElementById("recipe_name").value = picked_name_1;
  });

  var image_1 = d3.select("#pic1");
  image_1.on("click", function () {
    document.getElementById("recipe_name").value = picked_name_1;
  });
  var image_2 = d3.select("#pic2");
  image_2.on("click", function () {
    document.getElementById("recipe_name").value = picked_name_2;
  });
  var image_3 = d3.select("#pic3");
  image_3.on("click", function () {
    document.getElementById("recipe_name").value = picked_name_3;
  });
  var image_4 = d3.select("#pic4");
  image_4.on("click", function () {
    document.getElementById("recipe_name").value = picked_name_4;
  });
  var image_5 = d3.select("#pic5");
  image_5.on("click", function () {
    document.getElementById("recipe_name").value = picked_name_5;
  });
  var image_6 = d3.select("#pic6");
  image_6.on("click", function () {
    document.getElementById("recipe_name").value = picked_name_6;
  });
  var image_7 = d3.select("#pic7");
  image_7.on("click", function () {
    document.getElementById("recipe_name").value = picked_name_7;
  });
});
