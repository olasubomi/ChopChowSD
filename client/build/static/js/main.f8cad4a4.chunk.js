(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,a){e.exports=a(271)},107:function(e,t,a){},270:function(e,t,a){},271:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),s=a(5),l=a.n(s),r=(a(107),a(10)),o=a(11),d=a(15),c=a(12),u=a(14),m=a(2),g=(a(108),function(e){function t(){return Object(r.a)(this,t),Object(d.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t={backgroundColor:"#fd8953"},a=this.props.recipes.map(function(a){return a===e.props.selectedMeal?n.a.createElement("li",{key:a.id,onClick:e.props.showIngredients}," ",n.a.createElement("span",{style:t},n.a.createElement("b",null,a.label))," "):n.a.createElement("li",{key:a.id,onClick:e.props.showIngredients}," ",a.label," ")});return n.a.createElement("div",null,n.a.createElement("ol",null," ",a," "))}}]),t}(i.Component)),p=a(99),h=(a(270),function(e){function t(){return Object(r.a)(this,t),Object(d.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props.selectedMeal.instructions.map(function(e){return n.a.createElement("li",{key:e}," ",e," ")});return n.a.createElement("div",null," Testing build updates",n.a.createElement("div",null,this.props.selectedMeal.label," "),n.a.createElement("div",null,n.a.createElement("img",{src:this.props.selectedMeal.imageSrc,alt:"info",style:{width:"350px",height:"350px"}})),n.a.createElement("div",null,this.props.selectedMeal.readTime," "),n.a.createElement("div",null," ",this.props.selectedMeal.cookTime),n.a.createElement(p.a,{trigger:n.a.createElement("a",{href:"#"},"Click here to read steps"),modal:!0,contentStyle:b},function(a){return n.a.createElement("div",null,n.a.createElement("a",{className:"close",onClick:a},"\xd7"),n.a.createElement("div",{className:"container",style:y,id:"bigContainer"},n.a.createElement("div",{className:"row",width:"80%"},n.a.createElement("div",{className:"container"}," ",n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm"},n.a.createElement("div",{className:"row align-items-center"},n.a.createElement("img",{src:e.props.selectedMeal.imageSrc,alt:"info",style:{width:"350px",height:"350px"}}))),n.a.createElement("div",{className:"col-sm"},n.a.createElement("ol",{style:v},t)))))))}))}}]),t}(i.Component)),y={font:"50px",display:"inline-block",width:"70%",height:"100%"},b={borderRadius:"25px",maxWidth:"1200px",maxHeight:"1200px",width:"90%",height:"50%"},v={},f=h,w=a(273),E=a(272),O=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(d.a)(this,Object(c.a)(t).call(this,e))).number=3,a.ingredientPopOver=!0,a.stored_ingredients=[{Garri:{availability:["Lizy Gidy"]},Water:{availability:["Lizy Gidy"]},Sugar:{availability:["Lizy Gidy"]},"Rice- 3 Cups":{availability:["Lizy Gidy"]},"Tomatoes x 6":{availability:["Lizy Gidy"]},"Onion x 2":{availability:["Lizy Gidy"]},"Palm Oil- 2 Cups":{availability:["Lizy Gidy"]},"Black Eyed Beans x 1 bag(350mL)":{availability:["Lizy Gidy"]},"Onions x 2":{availability:["Lizy Gidy"]},"Potatoes - 8":{availability:["Lizy Gidy"]},"Garlic- 6 cloves":{availability:["Lizy Gidy"]},Thyme:{availability:["Lizy Gidy"]},Oregano:{availability:["Lizy Gidy"]},Basil:{availability:["Lizy Gidy"]},"Parmesan Cheese":{availability:["Lizy Gidy"]},Oil:{availability:["Lizy Gidy"]},Butter:{availability:["Lizy Gidy"]}}],a.IngredientInfoToggle=a.IngredientInfoToggle.bind(Object(m.a)(Object(m.a)(a))),a.state={ingredientPopOver:!1},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"IngredientInfoToggle",value:function(e){console.log("toggled by:"+e.target),console.log()}},{key:"render",value:function(){var e,t=this,a=this.props.selectedMeal.ingredients.length,i=this.props.selectedMeal.ingredients.map(function(e){return n.a.createElement("li",{key:e}," ",e," \xa0",n.a.createElement("span",{id:e,onMouseOver:t.IngredientInfoToggle,onMouseOut:t.IngredientInfoToggle},n.a.createElement("img",{src:"/images/info_icon.png",alt:"Product details not found",style:{width:"13px",height:"13px"}})))});for(e=0;e<a;e++)n.a.createElement(w.a,{placement:"auto",isOpen:this.ingredientPopOver,target:this.props.selectedMeal.ingredients[e],toggle:this.IngredientInfoToggle},n.a.createElement(E.a,null,n.a.createElement("div",{className:"payback-disclaimer"},"In Stock in ",this.stored_ingredients," store(s)",n.a.createElement("br",null),n.a.createElement("hr",null),n.a.createElement("button",null,"Add to WishList"),n.a.createElement("br",null),n.a.createElement("button",null,"Add to Cart ")," ",n.a.createElement("br",null))));return n.a.createElement("div",null,n.a.createElement("ul",null," ",i," "))}}]),t}(n.a.Component),k=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(d.a)(this,Object(c.a)(t).call(this,e))).meals=[{id:1,label:"Garri",imageSrc:"../images/Garri.jpg",readTime:"2 mins read",cookTime:"2 mins to prepare",ingredients:["Garri","Water","Sugar"],new_ingredient:{Garri:{servings:{quantitiy:1,measurements:"Cup(s)"}},Water:{servings:{quantitiy:1,measurements:"Cup(s)"}},Sugar:{servings:{quantitiy:1,measurements:"Spoon(s)"}}},quantity:[1,2,1],measurements:["Cup(s)","Cup(s)","Spoon(s)"],instructions:["Mix Garri and Sugar in a bowl","Add ice, water and groundnuts as preffered","Enjoy!"],servings:1,display:!1},{id:2,label:"Puff Puff",imageSrc:"../images/puff_puff.jpg",readTime:"4 mins read",cookTime:"80  mins to prepare",ingredients:["Water- 2 Cups","Yeast - 2 and 1/4 teaspoons(1 packet)","Flour- 3 and 1/2 Cups","Sugar- 3/4 Cup"],new_ingredient:{Garri:{servings:{quantitiy:1,measurements:"Cup(s)"}},Water:{servings:{quantitiy:1,measurements:"Cup(s)"}},Sugar:{servings:{quantitiy:1,measurements:"Spoon(s)"}}},quantity:[1,2,1],measurements:["Cup(s)","Cup(s)","Spoon(s)"],instructions:["Mix salt, sugar, water, and yeast . Set aside for 5 minutes.","Add flour and mix.","Let the mixture rise for approximately 1- 2 hours","In a large,sauce pan pour vegetable oil into a pot, until it is at least 3 inches (or about 5 centimeters) high (too little will result in flatter balls), and place on low heat.","Test to make sure the oil is hot enough by putting a \u2018drop\u2019 of batter into the oil. If it is not hot enough, the batter will stay at the bottom of the pot rather than rising to the top.","Using your hands grab a little bit of mixture at time and drop in the oil.","When the oil is hot enough, use a spoon to dish up the batter, and another spoon or spatula to drop it in the oil, sort of in the shape of a ball.","Fry for a few minutes until the bottom side is golden brown.","Turn the ball over and fry for a few more minutes until the other side is golden brown.","Use a large spoon or something like that to take it out of the oil. I usually place them on napkins right away to soak up some of the excess oil.","If desired, you can roll the finished product in table sugar or powdered sugar to make it sweeter"],servings:4,display:!1},{id:3,label:"Jollof Rice",imageSrc:"../images/Jollof.jpg",readTime:"4 mins read",cookTime:"45 mins to prepare",ingredients:["Rice- 3 Cups","Tomatoes x 6","Onion x 2","Palm Oil- 2 Cups"],instructions:["Tomato , Onion Tatashe, Rodo Blended in Blender","Vegetable Oil + Palm Oil, Low Heat in Pan","Add onions to Pan","Add Tomato Paste","Add Powdered Ginger, Garlic and Curry","Add Blended Tomatoes mix (If too thick, add water)","Add seasoning, Maggi (Chicken Flavor), Salt","For Jollof Rice, add Bay Leaves."],display:!0},{id:4,label:"Fried Beans",imageSrc:"../images/FriedBeans.jpg",readTime:"4 mins read",cookTime:"60 mins to prepare",ingredients:["Black Eyed Beans x 1 bag(350mL)","Onions x 2","Palm Oil- 2 Cups"],instructions:["Soak beans in water overnight","The next day, chop 1 onion into thin slices, cut the other one into 4 big chunks then pound/grind the pepper.","Rinse the beans and put in a sizeable pot. I rinse it twice.","Pre-cook the sliced onions with a few drops of water to soften them a bit.","When the beans is done, add salt, leave to dry up all the water and transfer the beans to another container.","Now, set a dry clean pot on the stove, pour the palm oil and heat it up till the oil melts (if congealed). Note that you should only heat it up, not bleach the oil. You will know it is hot enough when a piece of onion dropped into the oil sizzles.","Add the precooked onions and stir for a bit.","Add the ground Habanero pepper and stir till everything is heated up very well, at most 2 minutes.","Add the beans and stir for about 2 minutes. Add salt if necessary.","Cover and leave to simmer for about 2 minutes and it's done."],display:!0},{id:5,label:"Roasted Potatoes",imageSrc:"../images/roasted_potatoes.jpg",readTime:"3 mins read",cookTime:"90 mins to prepare",ingredients:["Potatoes - 8","Garlic- 6 cloves","Thyme","Oregano","Basil","Parmesan Cheese","Oil","Butter"],instructions:["Adjust oven rack to lowest position and heat oven to 450 degrees. ","Cut potatoes into quarter chunks","Toss potatoes with oil, salt and pepper chopped garlic, Thyme, Oregano, Basil and then Parmesan Cheese","Arrange, cut side down, on a large lipped cookie sheet or jellyroll pan.","Roast until tender and golden brown, or until desired crispiness about 30-45 minutes","Add butter in between roasting for a savory taste, Transfer to a serving dish when ready."],display:!0}],a.showIngredients=function(e){var t,i=e.target.innerText;for(t in a.meals)if(a.meals[t].label===i){a.setState({selectedMealIngredients:a.meals[t].ingredients}),a.setState({selectedMeal:a.meals[t]});break}},a.suggestMealToggle=a.suggestMealToggle.bind(Object(m.a)(Object(m.a)(a))),a.state={suggestMealPopOver:!1,mealsListed:!1,mealSelected:!1,IngredientsListed:!1,recipes:a.meals,selectedMealIngredients:a.meals[0].new_ingredients,selectedMeal:a.meals[0],showFakeIngredients:{hidden:!1},showIngredients:{hidden:!0},showFakeProducts:{hidden:!1},showProducts:{hidden:!0}},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"suggestMealToggle",value:function(){this.setState({suggestMealPopOver:!this.state.suggestMealPopOver})}},{key:"render",value:function(){return n.a.createElement("div",{className:"container"},n.a.createElement("br",null),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm"},n.a.createElement("b",null,"Meals"),n.a.createElement(g,{recipes:this.state.recipes,showIngredients:this.showIngredients,selectedMeal:this.state.selectedMeal}),n.a.createElement("span",null,"+"),n.a.createElement("input",{placeholder:"Suggest Meal"}),"\xa0",n.a.createElement("button",null,"Submit ",n.a.createElement("span",{id:"Popover1",onMouseOver:this.suggestMealToggle,onMouseOut:this.suggestMealToggle},n.a.createElement("img",{src:"/images/info_icon.png",alt:"info",style:{width:"13px",height:"13px"}})," "))),n.a.createElement("div",{className:"col-sm"},n.a.createElement("b",null,"Recipe Contents"),n.a.createElement(f,{selectedMeal:this.state.selectedMeal})),n.a.createElement("div",{className:"col-sm"},n.a.createElement("b",null,"Ingredients"),n.a.createElement(O,{selectedMealIngredients:this.state.selectedMealIngredients,selectedMeal:this.state.selectedMeal})),n.a.createElement(w.a,{placement:"auto",isOpen:this.state.suggestMealPopOver,target:"Popover1",toggle:this.suggestMealToggle},n.a.createElement(E.a,null,n.a.createElement("div",{className:"payback-disclaimer"},"Suggestions by Guest Users are recorded, but do not change the publicly displayed Meals.")))))}}]),t}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(n.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[102,1,2]]]);
//# sourceMappingURL=main.f8cad4a4.chunk.js.map