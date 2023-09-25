const jwt = require("jsonwebtoken");
require('dotenv').config();
const { decodedToken } = require('../decodeToken');

const resolvers = {
  Query: {
    users: async (_, __, { dataSources }, { req }) => {
      console.log(`users - req - ${req}`)
      const decoded = decodedToken(req);
      const result = await dataSources.dbDataSource.getAllUsers();
      const items = JSON.stringify(result);
      return JSON.parse(items);
    },

    user: async (_, args, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const id = Number(args.id);
      const result = await dataSources.dbDataSource.getUser(id);
      const item = JSON.stringify(result);
      return JSON.parse(item);
    },

    golfcourses: async (_, __, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const result = await dataSources.dbDataSource.getAllGolfCourses();
      const items = JSON.stringify(result);
      return JSON.parse(items);
    },

    golfcourse: async (_, args, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const id = Number(args.id);
      const result = await dataSources.dbDataSource.getGolfCourse(id);
      const item = JSON.stringify(result);
      return JSON.parse(item);
    },

    holes: async (_, __, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const result = await dataSources.dbDataSource.getAllHoles();
      const items = JSON.stringify(result);
      return JSON.parse(items);
    },

    hole: async (_, args, { dataSources }, { req }) => {
      const id = Number(args.id);
      const result = await dataSources.dbDataSource.getCourseHole(id);
      const item = JSON.stringify(result);
      return JSON.parse(item);
    },

    scorecards: async (_, __, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const result = await dataSources.dbDataSource.getAllScoreCards();
      const items = JSON.stringify(result);
      return JSON.parse(items);
    },

    scorecard: async (_, args, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const id = Number(args.id);
      const result = await dataSources.dbDataSource.getScoreCard(id);
      const item = JSON.stringify(result);
      return JSON.parse(item);
    },

    holescores: async (_, __, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const result = await dataSources.dbDataSource.getAllHoleScores();
      const items = JSON.stringify(result);
      return JSON.parse(items);
    },

    holescore: async (_, args, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const id = Number(args.id);
      const result = await dataSources.dbDataSource.getHoleScore(id);
      const item = JSON.stringify(result);
      return JSON.parse(item);
    },
  },
  User: {
    cards: async (parent, __, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const player_id = Number(parent.id);
      const result = await dataSources.dbDataSource.getUserScoreCards(player_id);
      const items = JSON.stringify(result);
      return JSON.parse(items);
    },
  },
  Hole: {
    course: async (parent, _, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const course_id = Number(parent.course_id);
      const result = await dataSources.dbDataSource.getGolfCourse(course_id);
      const item = JSON.stringify(result);
      return JSON.parse(item);
    },
  },
  GolfCourse: {
    holes: async (parent, _,{ dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const course_id = Number(parent.id);
      const result = await dataSources.dbDataSource.getAllCourseHoles(course_id);
      const items = JSON.stringify(result);
      return JSON.parse(items);
    },
    cards: async (parent, __, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const course_id = Number(parent.id);
      const result = await dataSources.dbDataSource.getCourseScoreCards(course_id);
      const items = JSON.stringify(result);
      return JSON.parse(items);
    },
  },
  ScoreCard: {
    player: async (parent, __, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const player_id = Number(parent.id);
      const result = await dataSources.dbDataSource.getUser(player_id);
      const item = JSON.stringify(result);
      return JSON.parse(item);
    },
    course: async (parent, __, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const course_id = Number(parent.course_id);
      const result = await dataSources.dbDataSource.getGolfCourse(course_id);
      const item = JSON.stringify(result);
      return JSON.parse(item);
    },
    scores: async (parent, __, { dataSources }, { req }) => { // New
      const decoded = decodedToken(req);
      const card_id = Number(parent.id);
      const result = await dataSources.dbDataSource.getCardScores(card_id);
      const items = JSON.stringify(result);
      return JSON.parse(items);
    }
  },
  HoleScore: {
    score_card: async (parent, __, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const score_card_id = Number(parent.score_card_id);
      const result = await dataSources.dbDataSource.getScoreCard(score_card_id);
      const item = JSON.stringify(result);
      return JSON.parse(item);
    },
    hole: async (parent, __, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const hole_id = Number(parent.hole_id);
      const result = await dataSources.dbDataSource.getCourseHole(hole_id);
      const item = JSON.stringify(result);
      return JSON.parse(item);
    }
  },
  Mutation: {
    createGolfCourse: async (_, args, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const newCourse = args.newCourse;
      const savedCourse = await dataSources.dbDataSource.addGolfCourse(newCourse);
      return savedCourse;
    },
    updateGolfCourse: async (_, args, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const changedCourse = args.changedCourse;
      const savedCourse = await dataSources.dbDataSource.updateGolfCourse(changedCourse);
      return savedCourse;
    },
    signUpUser: async (_, args, { dataSources }) => {
      const newUser = args.newUser;
      encryptedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = encryptedPassword;
      const savedUser = await dataSources.dbDataSource.addUser(newUser);
      return savedUser;
    },
    updateUser: async (_, args, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      const changedUser = args.changedUser;
      const existingUser = await dataSources.getUser(changedUser.id);
      if (args.changedUser.password != existingUser.password) {
        encryptedPassword = await bcrypt.hash(args.changedUser.password, 10);
        args.changedUser.password = encryptedPassword;
      }
      const savedUser = await dataSources.dbDataSource.updateUser(changedUser);
      return savedUser;
    },
    addUpdateHole: async (_, args, { dataSources }, { req }) => {
      const decoded = decodedToken(req);
      var hole = args.hole;
      const hole_number = hole.hole_number;
      const course_id = hole.course_id;
      hole.course_id = course_id;
      const existingCourse = await dataSources.dbDataSource.getGolfCourse(course_id);
      if (!existingCourse) {
        throw("Course not found!!!")
      }
      var existingHole = await await dataSources.dbDataSource.getCourseHoleByHoleNumber(course_id, hole_number);
      if (existingHole) {
        existingHole.hole_index = hole.hole_index;
        existingHole.distance_to_hole = hole.distance_to_hole;
        existingHole.par_strokes = hole.par_strokes;
        hole = await dataSources.dbDataSource.updateCourseHole(existingHole);
      } else {
        hole = await dataSources.dbDataSource.addCourseHole(hole);
      }
      return hole;
    },
    signInUser: async (_, args, { dataSources }) => {
      var username = args.username;
      var password = args.password;
      const user = await dataSources.dbDataSource.getUserByName(username);
      var response = {
        authenticated: false,
        user: null,
        JWT_TOKEN: null
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user.id, email: user.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: process.env.TOKEN_EXPIRY,
          }
        );
        response.JWT_TOKEN = token;
        response.user = user;
        response.authenticated = true;
      }
      return response;
    }
  }
}

module.exports = { resolvers }
