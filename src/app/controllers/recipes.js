const Recipe = require('../models/Recipe');

module.exports = {
/* === USERS METHODS === */

accessed(req, res){
    // let recipesAccessed = [];
    // for(let i = 0; i < 6; i++) {
    // recipesAccessed.push(recipeData[i]);
    // }
    return res.render("Users/home");
},

filtered(req, res){
  // let recipesFiltered = [];

  // for(let i = 0; i < 6; i++) {
  //     const obj = recipeData[i];
  //     obj.index = i;
  //     recipesFiltered.push(obj);
  // }

  let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 3
    let offset = limit * (page - 1)
    
    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes){
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }
        

        return res.render("Users/recipes", { recipes, pagination, filter });
      }
    }

    Recipe.paginate(params)  
},

details(req, res){
  // const recipeIndex = req.params.index;
  // const recipe = recipeData[recipeIndex];
  
  // if (!recipe) return res.send("Recipe not found!");
  Recipe.find(req.params.id, function(recipe) {
    if(!recipe) return res.send("Receita não encontrada!")
    
    return res.render("Users/details", { recipe });
  })
},

about(req, res){
    return res.render("Users/about");
},

/* === ADMIN METHODS === */

index(req, res){
  Recipe.all(function(recipes){
    return res.render("admin/recipes/recipeList", { recipes });
  })
},

create(req, res){
  Recipe.chefsSelectOption(function(options){

    return res.render("Admin/recipes/create", { chefOptions: options });
  })
},

show(req, res){
  Recipe.find(req.params.id, function(recipe) {
    if(!recipe) return res.send("Receita não encontrada!")
    
    return res.render("Admin/recipes/show", { recipe });
  })
},

edit(req, res){
  Recipe.find(req.params.id, function(recipe) {
    if(!recipe) return res.send("Chef não encontrado!")

    Recipe.chefsSelectOption(function(options){

      return res.render("Admin/recipes/edit", { recipe, chefOptions: options });
    })
  })
},

/* === POST, PUT, DELETE METHODS === */

post(req, res){
  const keys = Object.keys(req.body)
  for(key of keys) {
    if (req.body[key] == ""){
      return res.send('Preencha todos os campos')
    }
  }

  Recipe.create(req.body, function(recipe){
    return res.redirect(`/admin/recipes/${recipe.id}`);
  })
},

put(req, res){
  const keys = Object.keys(req.body)            
    for(key of keys) {
      if (req.body[key] == ""){
        return res.send('Preencha todos os campos')
      }
    }
    
  Recipe.update(req.body, function(){
    return res.redirect(`/admin/recipes/${req.body.id}`)
  })
},

delete(req, res){
  Recipe.delete(req.body.id, function(){
    return res.redirect(`/admin/recipes/`)
  })
}
}