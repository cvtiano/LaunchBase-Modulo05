const { date } = require('../../lib/date');
const db = require('../../config/db');


module.exports = {
  all(callback) {
    db.query(`select * from recipes`, function(err, results){
      if(err) throw `Database Error! ${err}`
      
      callback(results.rows)
    })
  },

  create(data, callback) {
    const query = `
      INSERT INTO recipes (        
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at,
        chef_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `
    const values = [      
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
      data.chef
    ]

    db.query(query, values, function(err, results){
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    });
  },

  find(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.id = $1`, [id], function(err, results){
        if(err) throw `Database Error! ${err}`
        callback(results.rows[0])
    })
  },

  update(data, callback) {
    const query = `
    UPDATE recipes SET
    image=($1),
    title=($2),
    ingredients=($3),
    preparation=($4),
    information=($5),
    created_at=($6),
    chef_id=($7)
    
    WHERE id = $8
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.preparation,
      date(Date.now()).iso,
      data.chef,
      data.id
    ]


    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },

  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
      if(err) throw `Database Error! ${err}`

      return callback()
    })
  },

  chefsSelectOption(callback) {
    db.query(`SELECT name, id FROM chefs`, function(err, results){
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },

  paginate(params) {
    const { filter, limit, offset, callback } = params

    let query = ""
    let filterQuery = ""
    let totalQuery = `(
      SELECT count(*) from recipes
    ) AS total`

    
    if( filter ) {
      filterQuery = `
      WHERE recipes.title ILIKE '%${filter}%'
      OR chefs.name ILIKE '%${filter}%'`
      
      totalQuery = `(
        SELECT count(*) from recipes
        ${filterQuery}
        ) AS total`
    }      
    
    query = `
    SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    ${filterQuery}
    GROUP BY recipes.id, chefs.name LIMIT $1 OFFSET $2
    `

    db.query(query, [limit, offset], function(err, results) {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  }
}