const router = require("express").Router();
const faker = require("faker");
const User = require("../models/user");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 1; i++) {
    let user = new User();
    
    user.name = faker.internet.userName();
    user.password = faker.internet.password();

    user.teams.push({
      name: faker.animal.type(),
      players: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        sex: "male",
        availability: true,
        preferredPos: [],
        lineup: {
          inning1: "-",
          inning2: "-",
          inning3: "-",
          inning4: "-",
          inning5: "-",
          inning6: "-",
          inning7: "-"
        }
      },
      settings: {
        numInnings: 7,
        positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RCF", "RF"],
        minPlayers: 8,
        sexMin: {
          sex: "female",
          min: 4
        },
        infieldReq: {
          sex: "female",
          min: 1
        },
        outfieldReq: {
          sex: "female",
          min: 1
        },
        battingReq: {
          sex: "female",
          min: 3
        }
      }
      });

    user.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

//GET all users
router.get("/api/users", (req, res, next) => {
  User.find().exec((err, users) => {
    if (err) return next(err);
    res.send(users);
  });
});

//POST add a new user, requires 'name' and 'password' in req body
router.post("/api/users", (req, res, next) => {
  const newUser = new User();

  newUser.name = req.body.name;
  newUser.password = req.body.password;
  newUser.teams = [];

  newUser.save((err) => {
    if (err) return next(err);
    console.log('User successfully added.');
  });
  res.end();
});

//GET a specific user, requires user ID param
router.get("/api/users/:user", (req, res, next) => {
  const {user} = req.params;

  User.find({_id: user}).exec((err, user) => {
    if (err) return next(err);
    res.send(user)
  });
});

//GET all teams for a specific user, requires user ID param
router.get("/api/:user/teams", (req, res, next) => {
  const {user} = req.params;

  User.find({_id: user}).exec((err, user) => {
    if (err) return next(err);
    res.send(user[0].teams);
  });
});

//POST add a new team, requires user ID param and 'name' in req body
router.post("/api/:user/teams", (req, res, next) => {
  const {user} = req.params;

  User.find({_id: user}).exec((err, user) => {
    if (err) return next(err);
    user[0].teams.push(req.body);
    user[0].save((err) => {
      if (err) return next(err);
      console.log('Team successfully added.');
    });
  });
  res.end();
});

//GET a specific team, requires user ID param and team ID param
router.get("/api/:user/teams/:team", (req, res, next) => {
  const {user} = req.params;
  const {team} = req.params;

  User.find({_id: user}, {teams: {$elemMatch: {_id: team}}}).exec((err, obj) => {
    if (err) return next(err);
    res.send(obj[0].teams[0]);
  });
});

//PUT edit the name of a team, requires user ID param, team ID param and 'name' in req body
router.put("/api/:user/teams/:team", (req, res, next) => {
  const {user} = req.params;
  const {team} = req.params;

  User.find({_id: user}, {teams: {$elemMatch: {_id: team}}}).exec((err, obj) => {
    if (err) return next(err);
    obj[0].teams[0].name = req.body.name;
    obj[0].save((err) => {
      if (err) return next(err);
      console.log('Team name successfully changed.');
    });
  });
  res.end();
});

//DELETE a specific team, requires user ID param and team ID param
router.delete("/api/:user/teams/:team", (req, res, next) => {
  const {user} = req.params;
  const {team} = req.params;

  User.find({_id: user}).exec((err, user) => {
    if (err) return next(err);

    console.log(user[0].teams);
    user[0].teams.remove({_id: team});

    user[0].save((err) => {
      if (err) return next(err);
      console.log('Team successfully deleted.');
    });
  });
  res.end();
});


module.exports = router;