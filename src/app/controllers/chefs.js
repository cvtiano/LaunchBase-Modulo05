const Chef = require('../models/Chef');

module.exports = {
  /* === USERS METHODS === */
  
  accessed(req, res){        
    return res.render("Users/home");
  },

  filtered(req, res){
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 3
    let offset = limit * (page - 1)
    
    const params = {
      filter,
      page,
      limit,
      offset,
      callback(chefs) {
        const pagination = {
          total: Math.ceil(chefs[0].total / limit),
          page
        }
        

        return res.render("Users/chefs", { chefs, pagination, filter });
      }
    }

    Chef.paginate(params)

    // if( filter ) {
    //   Chef.findBy(filter, function(chefs) {
    //     return res.render("Users/chefs", { chefs, filter });
    //   })

    // } else {
    //   Chef.all(function(chefs) {

    //     return res.render("Users/chefs", { chefs })
    //   })    
  },

  home(req, res){        
    return res.render("Users/details");
  },

  about(req, res){
    return res.render("Users/about");
  },

  /* === ADMIN METHODS === */

  index(req, res){
    Chef.all(function(chefs){
      return res.render("admin/chefs/listChef", { chefs });
    })
  },

  create(req, res){
    return res.render("Admin/chefs/createChef");
  },

  show(req, res){
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef não encontrado!")
      
      return res.render("Admin/chefs/showChef", { chef });
    })
  },

  edit(req, res){
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef não encontrado!")
      
      return res.render("Admin/chefs/editChef", { chef });
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

    Chef.create(req.body, function(chef){
      return res.redirect(`/admin/chefs/${chef.id}`);
    })
  },

  put(req, res){
    const keys = Object.keys(req.body)            
      for(key of keys) {
        if (req.body[key] == ""){
          return res.send('Preencha todos os campos')
        }
      }
      
      Chef.update(req.body, function(){
        return res.redirect(`/admin/chefs/${req.body.id}`)
      })
  },

  delete(req, res){
    Chef.delete(req.body.id, function(){
      return res.redirect(`/admin/chefs/`)
    })
  }
}