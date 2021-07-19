const express = require('express');
const recipes = require('../src/app/controllers/recipes');
const chefs = require('../src/app/controllers/chefs');
const routes = express.Router();

module.exports = routes

/* === USERS ROUTES - RECIPES === */
routes.get("/", recipes.accessed);
routes.get("/recipes", recipes.filtered);
routes.get("/recipes/:id", recipes.details);
routes.get("/about", recipes.about);


/* === USERS ROUTES - CHEFS === */
routes.get("/chefs", chefs.filtered);
routes.get("/chefs/:index", chefs.home);
routes.get("/about", chefs.about);


/* === ADMIN ROUTES - RECIPES === */
routes.get("/admin/recipes", recipes.index);
routes.get('/admin/recipes/create', recipes.create);
routes.get('/admin/recipes/:id/edit', recipes.edit);
routes.get('/admin/recipes/:id', recipes.show);
routes.post ("/admin/recipes", recipes.post);
routes.put('/admin/recipes', recipes.put);
routes.delete('/admin/recipes', recipes.delete);


/* === ADMIN ROUTES - CHEFS === */
routes.get("/admin/chefs", chefs.index);
routes.get('/admin/chefs/create', chefs.create);
routes.get('/admin/chefs/:id/edit', chefs.edit);
routes.get('/admin/chefs/:id', chefs.show);
routes.post("/admin/chefs", chefs.post);
routes.put('/admin/chefs', chefs.put);
routes.delete('/admin/chefs', chefs.delete);