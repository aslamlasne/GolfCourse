const { DataSource } = require('apollo-datasource');
const Pool = require('pg').Pool
require('dotenv').config();

class dbDataSource extends DataSource {
  constructor() {
    super();
  }
  initialize(config) {
    this.context = config.context;
  }

  createPool() {
    if (this.pool) {
      return this.pool;
    }
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    })
    console.log('Pool has been created..')
    return this.pool;
  }

  getAllUsers = async () => {
    const mypool = this.createPool();
    const result = await mypool.query('SELECT * FROM users ORDER BY id ASC;');
    return result.rows;
  }

  getUser = async (id) => {
    const mypool = this.createPool();
    const result = await mypool.query(`SELECT * FROM users WHERE id = ${id};`);
    return result.rows[0];
  }

  getUserByName = async (username) => {
    const mypool = this.createPool();
    const result = await mypool.query(`SELECT * FROM users WHERE username = '${username}';`);
    return result.rows[0];
  }

  addUser = async ({name, gender, date_of_birth, username, password, handicap, calculated_on, email}) => {
    const mypool = this.createPool();
    var sql = 'INSERT INTO users ( name, gender, date_of_birth, username, password, email';
    if (handicap) {
      sql = sql + `, handicap`;
    }
    if (calculated_on) {
      sql = sql + `, calculated_on`;
    }
    sql = sql + ` ) VALUES ( '${name}', '${gender}', '${date_of_birth}', '${username}', '${password}', '${email}'`
      if (handicap) {
        sql = sql + `, '${handicap}'`;
      }
      if (calculated_on) {
        sql = sql + `, '${calculated_on}'`;
      }
    sql = sql + ' ) RETURNING id;';
    console.log(sql);
    const result = await mypool.query(sql);
    return this.getUser(result.rows[0].id);
  }

  updateUser = async  ({id, name, gender, date_of_birth, username, password, handicap, calculated_on, email}) => {
    const mypool = this.createPool();
    console.log(`input - id = '${id}' name = '${name}', gender = '${gender}', date_of_birth = '${date_of_birth}'`)
    console.log(`input - username = '${username}' password = '${password}', handicap = '${handicap}'`)
    console.log(`input - calculated_on = '${calculated_on}' email = ${email}`)
    var sql = 'UPDATE users SET ' +
    ` name = '${name}', gender = '${gender}', date_of_birth = '${date_of_birth}',` +
    ` username = '${username}', password = '${password}', email = '${email}'`;
    if (handicap) {
      sql = sql + `, handicap = ${handicap}`
    }
    if (calculated_on) {
      sql = sql + `, calculated_on = '${calculated_on}'`
    }
    sql = sql + ` WHERE id = ${id};`;
    console.log(`sql - ${sql}`)
    const result = await mypool.query(sql);
    return this.getUser(id);
  }

  getAllGolfCourses = async () => {
    const mypool = this.createPool();
    const result = await mypool.query('SELECT * FROM golfcourses ORDER BY id ASC;');
    return result.rows;
  }

  getGolfCourse = async (id) => {
    const mypool = this.createPool();
    const result = await mypool.query(`SELECT * FROM golfcourses WHERE id = ${id};`);
    return result.rows[0];
  }

  addGolfCourse = async ({name, address, zip}) => {
    const mypool = this.createPool();
    const sql = 'INSERT INTO golfcourses ( name, address, zip )' +
    ` VALUES ( '${name}', '${address}', '${zip}' ) RETURNING id;`;
    const result = await mypool.query(sql);
    return this.getGolfCourse(result.rows[0].id);
  }

  updateGolfCourse = async ({id, name, address, zip}) => {
    const mypool = this.createPool();
    console.log(`input - id = '${id}' name = '${name}', address = '${address}', zip = '${zip}'`)
    const sql = 'UPDATE golfcourses SET ' +
    ` name = '${name}', address = '${address}', zip = '${zip}'` +
    ` WHERE id = ${id};`;
    console.log(`sql - ${sql}`)
    const result = await mypool.query(sql);
    return this.getGolfCourse(id);
  }

  getAllCourseHoles = async (course_id) => {
    const mypool = this.createPool();
    const result = await mypool.query(`SELECT * FROM holes WHERE course_id = ${course_id} ORDER BY id ASC;`);
    console.log(JSON.stringify(result.rows));
    return result.rows;
  }

  getAllHoles = async () => {
    const mypool = this.createPool();
    const result = await mypool.query('SELECT * FROM holes ORDER BY id ASC;');
    console.log(JSON.stringify(result.rows));
    return result.rows;
  }

  getCourseHole = async (id) => {
    const mypool = this.createPool();
    const result = await mypool.query(`SELECT * FROM holes WHERE id = ${id}`);
    return result.rows[0];
  }


  getCourseHoleByHoleNumber = async (course_id, hole_number) => {
    const mypool = this.createPool();
    const result = await mypool.query(`SELECT * FROM holes WHERE course_id = ${course_id} and hole_number = ${hole_number}`);
    return result.rows[0];
  }

  addCourseHole = async ({course_id, hole_number, hole_index, distance_to_hole, par_strokes}) => {
    const mypool = this.createPool();
    const sql = 'INSERT INTO holes ( course_id, hole_number, hole_index, distance_to_hole, par_strokes )' +
      ` VALUES ( ${course_id}, ${hole_number}, ${hole_index}, ${distance_to_hole}, ${par_strokes} ) RETURNING id;`;
    const result = await mypool.query(sql);
    return this.getCourseHole(result.rows[0].id);
  }

  updateCourseHole = async ({id, course_id, hole_number, hole_index, distance_to_hole, par_strokes}) => {
    const mypool = this.createPool();
    console.log(`input - id = ${id} course_id = ${course_id} hole_number = ${hole_number}, hole_index = ${hole_index}, distance_to_hole = ${distance_to_hole}, par_strokes = ${par_strokes}`)
    const sql = 'UPDATE holes SET ' +
      ` course_id = ${course_id}, hole_number = ${hole_number}, hole_index = ${hole_index}, distance_to_hole = ${distance_to_hole}, par_strokes = ${par_strokes}` +
      ` WHERE id = ${id};`;
    console.log(`updateCourseHole - sql - ${sql}`)
    const result = await mypool.query(sql);
    return this.getCourseHole(id);
  }

  getAllScoreCards = async () => {
    const mypool = this.createPool();
    const result = await mypool.query('SELECT * FROM score_cards ORDER BY id ASC;');
    console.log(JSON.stringify(result.rows));
    return result.rows;
  }

  getScoreCard = async (id) => {
    const mypool = this.createPool();
    const result = await mypool.query(`SELECT * FROM score_cards WHERE id = ${id}`);
    return result.rows[0];
  }

  getCardScores = async (card_id) => {
    const mypool = this.createPool();
    const result = await mypool.query(`SELECT * FROM hole_scores WHERE score_card_id = ${card_id}`);    
    console.log(JSON.stringify(result.rows));
    return result.rows;
  } 

  getAllHoleScores = async () => {
    const mypool = this.createPool();
    const result = await mypool.query('SELECT * FROM hole_scores ORDER BY id ASC;');
    console.log(JSON.stringify(result.rows));
    return result.rows;
  }

  getHoleScore = async (id) => {
    const mypool = this.createPool();
    const result = await mypool.query(`SELECT * FROM hole_scores WHERE id = ${id}`);
    return result.rows[0];
  }

  getUserScoreCards = async (user_id) => {
    const mypool = this.createPool();
    const result = await mypool.query(`SELECT * FROM score_cards WHERE player_id = ${user_id} ORDER BY id ASC;`);
    console.log(JSON.stringify(result.rows));
    return result.rows;
  }

  getCourseScoreCards = async (course_id) => {
    const mypool = this.createPool();
    const result = await mypool.query(`SELECT * FROM score_cards WHERE course_id = ${course_id} ORDER BY id ASC;`);
    console.log(JSON.stringify(result.rows));
    return result.rows;
  }
}


module.exports = { dbDataSource }