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
            return
    
        },
        create(req, res){
            return
    
        },
        show(req, res){
            return
    
        },
        edit(req, res){
            return
    
        },
        post(req, res){
            const keys = Object.keys(req.body)            
                for(key of keys) {
                    if (req.body[key] == ""){
                        return res.send('Preencha todos os campos')
                    }
                }
                
                const query = `
                    INSERT INTO chefs (
                        name,
                        avatar_url,
                        created_at
                    ) VALUES ($1, $2, $3)
                    RETURNING id
                `
                const values = [
                    req.body.name,
                    req.body.avatar_url,
                    req.body.created_at
                ]
    
                return
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