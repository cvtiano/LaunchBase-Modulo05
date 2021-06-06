const db = require('../../config/db');
const { date } = require('../../lib/date');

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
        return res.render("Users/chefs", {items: recipesFiltered});
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
    //   db.query(`select * from chefs`, function(err, results){
    //     if(err) return res.send("Database Error!")

    //     return res.render("admin/chefs/listChef", {chefs: results.rows})
        
    //   })

      return res.render("Admin/chefs/listChef");
    },

    create(req, res){
        return res.render("Admin/chefs/createChef");

    },

    show(req, res){
        const { id: chefId } = req.params
        const chef = data.recipes.find((chef) => {
            if (chef.id == chefId) {
                return true;
        }
    });

    if (!chef) {
        return res.send("Recipe not found!")
    }    
    return res.render("Admin/chefs/showChef", { item: chef });
    
    },

    edit(req, res){
        const { id: chefId } = req.params
        const chef = data.recipes.find((chef) => {
        if (chef.id == chefId) {
            return true;
        }
    });

    if (!chef) {
        return res.send("Chef not found!")
    }
    return res.render("Admin/chefs/editChef", { item: chef });
    },

    post(req, res){        
      const keys = Object.keys(req.body)

      for(key of keys) {
        if (req.body[key] == ""){
          return res.send('Preencha todos os campos')
        }
      }

      req.body.created_at = date(Date.now()).iso;

      const query = `
          INSERT INTO chefs (
              name,
              avatar_url
              created_at
          ) VALUES ($1, $2, $3)
          RETURNING id
      `
      const values = [
          req.body.name,
          req.body.avatar_url,
          req.body.created_at
      ]

      db.query(query, values, function(err, results) {
          console.log(err)
          console.log(results)
          return
      })
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
        return

    }
}