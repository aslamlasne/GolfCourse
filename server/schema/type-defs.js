const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    gender: Gender!
    date_of_birth: String!
    username: String!
    password: String!
    handicap: Int
    email: String!
    calculated_on: String
    cards: [ScoreCard]
  }

  type ScoreCard {
    id: ID!
    player_id: ID!
    player: User!
    course_id: ID!
    course: GolfCourse!
    played_on: String!
    holes_played: Int!
    gross_score: Int
    handicap: Int
    scores: [HoleScore]
  }

  type HoleScore {
    id: ID!
    card_id: ID!
    score_card: ScoreCard
    strokes: Int!
    score: Int!
    hole_id: ID!
    hole: Hole
  }

  type GolfCourse {
    id: ID!
    name: String!
    address: String!
    zip: String!
    holes: [Hole]
    cards: [ScoreCard]
  }

  type Hole {
    id: ID!
    course: GolfCourse,
    course_id: ID!,
    hole_number: Int!
    hole_index: Int!
    distance_to_hole: Float!
    par_strokes: Int!
    scores: [HoleScore]
  }

  type Query {
    users: [User!]
    user(id: ID!): User!
    golfcourses: [GolfCourse!]
    golfcourse(id: ID!): GolfCourse!
    holes: [Hole!]
    hole: Hole!
    scorecards: [ScoreCard!]
    scorecard(id: ID!): ScoreCard!
    holescores: [HoleScore!]
    holescore(id: ID!): HoleScore
  }

  input GolfCourseInput {
    id: ID
    name: String!
    address: String!
    zip: String!
  }
 
  input UserInput {
    id: ID
    name: String!
    gender: Gender!
    date_of_birth: String!
    username: String!
    password: String!
    handicap: Int
    email: String!
    calculated_on: String
  }

  input SignInInput {
    username: String!
    password: String!
  }

  type SignInOutput {
    user: User
    authenticated: Boolean!
    JWT_TOKEN: String
  }

  input HoleInput {
    id: ID
    course_id: ID!
    hole_number: Int!
    hole_index: Int!
    distance_to_hole: Float!
    par_strokes: Int!
  }

  input ScoreCardInput {
    playedon: String!
    playedeighteenholes: Boolean
    grossscore: Int
    handicap: Int
  }

  input HoleScoreInput {
    strokes: Int!
    scores: Int!
  }

  type Mutation {
    createGolfCourse(newCourse: GolfCourseInput): GolfCourse!
    updateGolfCourse(changedCourse: GolfCourseInput!): GolfCourse!
    addUpdateHole(hole: HoleInput): Hole!
    signUpUser(newUser: UserInput): User!
    updateUser(changedUser: UserInput!): User!
    signInUser(signInInfo: SignInInput!): SignInOutput!
  }
 
  enum Gender {
    Male,
    Female
  }
`

module.exports = { typeDefs }
/*
    addScoreCard(newScoreCard: ScoreCard): ScoreCard!
    updateScoreCard(id: ID!, changedScoreCard: ScoreCard): ScoreCard!
    addHoleScore(newHoleScore: HoleScoreInput): HoleScore!
    updateHoleScore(id: ID!, changedHoleScore: HoleScoreInput): HoleScore
*/