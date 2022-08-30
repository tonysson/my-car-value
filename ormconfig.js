

var dbConfig = {
    synchronize : false,
    migrations : ['migrations/*.js'],
    cli : {
        migrationsDir: 'migrations'
    }
}

switch(process.env.NODE_ENV){

    case 'development':
        Object.assign(dbConfig , {
            type : 'sqlite',
            database : 'db.sqlite',
            entites : ['**/*.entity.js']
        })
        break;
    case 'test':
        Object.assign(dbConfig, {
          type: 'sqlite',
          database: 'test.sqlite',
          entites: ['**/*.entity.ts'],
        });
        break;
    case 'production':

    default:
        throw new Error('unknown environment')
}

module.exports = dbConfig