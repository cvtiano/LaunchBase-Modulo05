const recipeData = require("../../../data");

const data = require("../../../data.json"); //teste

module.exports = {
/* === USERS METHODS === */

    accessed(req, res){
        let recipesAccessed = [];
        for(let i = 0; i < 6; i++) {
        recipesAccessed.push(recipeData[i]);
        }
        return res.render("Users/home", { items: recipesAccessed });
    },

    filtered(req, res){
        let recipesFiltered = [];

        for(let i = 0; i < 6; i++) {
            const obj = recipeData[i];
            obj.index = i;
            recipesFiltered.push(obj);
        }
        return res.render("Users/recipes", {items: recipesFiltered});
    },

    home(req, res){
        const recipeIndex = req.params.index;
        const recipe = recipeData[recipeIndex];
        
        if (!recipe) return res.send("Recipe not found!");
        return res.render("Users/details", { item: recipe });
    },

    about(req, res){
        return res.render("Users/about");
    },

/* === ADMIN METHODS === */
    
    index(req, res){
        let recipesList = [];
        for(recipe in data.recipes) {
            recipesList.push(data.recipes[recipe]);
    }
    return res.render("Admin/recipes/recipe-list", { items: recipesList });

    },

    create(req, res){
        return res.render("Admin/recipes/create");
    },

    show(req, res){
        const { id: recId } = req.params
        const rec = data.recipes.find((rec) => {
            if (rec.id == recId) {
                return true;
        }
    });

    if (!rec) {
        return res.send("Recipe not found!")
    }    
    return res.render("Admin/recipes/show", { item: rec });

    },

    edit(req, res){
        const { id: recId } = req.params
        const rec = data.recipes.find((rec) => {
        if (rec.id == recId) {
            return true;
        }
    });

    if (!rec) {
        return res.send("Recipe not found!")
    }
    return res.render("Admin/recipes/edit", { item: rec });
    },

    /* === POST, PUT, DELETE METHODS === */

    post(req, res){
        const keys = Object.keys(req.body)            
            for(key of keys) {
                if (req.body[key] == ""){
                    return res.send('Preencha todos os campos')
                }
            }
            
            let { title, author, image, ingredient, preparation, plus_info} = req.body

            return (req.body)
    },

    put(req, res){
        const keys = Object.keys(req.body)            
            for(key of keys) {
                if (req.body[key] == ""){
                    return res.send('Preencha todos os campos')
                }
            }
            return
    },

    delete(req, res){
        const { id } = req.body

        const filteredRecipes = data.recipes.filter(function(recipe) {
        return recipe.id != id
    });
    return res.redirect("/Admin/recipes/recipes");

    }
}