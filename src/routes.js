const express = require('express');
const recipes = require('../src/app/controllers/recipes');
const routes = express.Router();

module.exports = routes

/* === USERS ROUTES === */

routes.get("/", recipes.accessed);
routes.get("/recipes", recipes.filtered);
routes.get("/recipes/:index", recipes.home);
routes.get("/about", recipes.about);


/* === ADMIN ROUTES === */

routes.get("/admin/recipes", recipes.index);
routes.get('/admin/recipes/create', recipes.create);
routes.get('/admin/recipes/:id/edit', recipes.edit);
routes.get('/admin/recipes/:id', recipes.show);
routes.post ("/admin/recipes", recipes.post);
routes.put('/admin/recipes', recipes.put);
routes.delete('/admin/recipes', recipes.delete);