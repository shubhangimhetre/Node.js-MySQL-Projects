const knex= require('knex')({
    client: 'mysql', 
    connection: {host : 'localhost',user : 'root',password : 'Shubh@7171',database : 'Project3'}
});

knex.schema.createTable('Register', (table) => {
    table.increments('user_id');
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').unique();
  })
  .then((result) =>{console.log("Table Created.")} )
  .catch((err)=>{console.log("Table exists"); 
//   throw err
   })



knex.schema.createTable('Posts', (table) => {
    table.increments('post_id')
    table.string('blog_title')
    table.string('blog_post')
    table.integer('user_id')
    
  })
.then((result) =>{console.log("Table Created.")} )
.catch((err)=>{console.log("Table exists");
// throw err;
})


knex.schema.createTable('likes_dislikes', (table) => {
  table.integer('post_id')
  table.integer('post_like')
  table.integer('post_dislike')

})
.then((result) =>{console.log("Table Created.")} )
.catch((err)=>{console.log("Table exists");
// throw err;
})


// knex.schema.createTable('likes_dislikes', (table) => {
//   table.increments('sr_no')
//   table.integer('post_id')
//   table.integer('post_like')
//   table.string('liked_by')
//   table.integer('post_dislike')
//   table.string('disliked_by')
// })
// .then((result) =>{console.log("Table Created.")} )
// .catch((err)=>{console.log("Table exists");
// // throw err;
// })


