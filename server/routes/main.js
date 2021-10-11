const router = require("express").Router();
const faker = require("faker");
const Team = require("../models/team");

//GET all teams
router.get("/api/teams", (req, res, next) => {
  Team.find().exec((err, teams) => {
    if (err) return next(err);
    res.send(teams);
  });
});

//POST add a new team, requires 'login' and 'password' in req body
router.post("/api/teams", (req, res, next) => {
  const newTeam = new Team();

  newTeam.login = req.body.login;
  newTeam.password = req.body.password;
  newTeam.teamName = 'Your Team';
  newTeam.settings.push({
    numInnings: 7,
      positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RCF", "RF"],
      minPlayers: 0,
      sexMin: {
        sex: "female",
        min: 0
      },
      infieldReq: {
        sex: "female",
        min: 0
      },
      outfieldReq: {
        sex: "female",
        min: 0
      },
      battingReq: {
        sex: "female",
        min: 0
      }
  })

  newTeam.save((err) => {
    if (err) return next(err);
    console.log('Team successfully added.');
  });
  res.end();
});

//GET a specific team, requires team ID param
router.get("/api/teams/:team", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    res.send(teamRes)
  });
});

//PUT edit a team's name, requires team Id param and 'teamName' in req body
router.put("/api/teams/:team", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].teamName = req.body.teamName;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Team name successfully changed.');
    });
  });
  res.end();
});

//DELETE a specific team, requires team ID param
router.delete("/api/teams/:team", (req, res, next) => {
  const {team} = req.params;

  Team.remove({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
      console.log('Team successfully deleted.');
    });
  res.end();
});

//PUT edit a team's name, requires team Id param and 'login' and 'password' in req body
router.put("/api/teams/:team/login", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].login = req.body.login;
    teamRes[0].password = req.body.password;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Team login info successfully changed.');
    });
  });
  res.end();
});










//GET all teams for a specific user, requires user ID param
router.get("/api/:user/teams", (req, res, next) => {
  const {user} = req.params;

  User.find({_id: user}).exec((err, user) => {
    if (err) return next(err);
    res.send(user[0].teams);
  });
});

//POST add a new team, requires user ID param and 'teamName' in req body
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

//PUT edit the name of a team, requires user ID param, team ID param and 'teamName' in req body
router.put("/api/:user/teams/:team", (req, res, next) => {
  const {user} = req.params;
  const {team} = req.params;

  User.find({_id: user}, {teams: {$elemMatch: {_id: team}}}).exec((err, obj) => {
    if (err) return next(err);
    obj[0].teams[0].teamName = req.body.teamName;
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

    user[0].teams.remove({_id: team});

    user[0].save((err) => {
      if (err) return next(err);
      console.log('Team successfully deleted.');
    });
  });
  res.end();
});

//GET all players for a specific team, requires user ID param and team ID param
router.get("/api/:user/teams/:team/players", (req, res, next) => {
  const {user} = req.params;
  const {team} = req.params;

  User.find({_id: user}, {teams: {$elemMatch: {_id: team}}}).exec((err, obj) => {
    if (err) return next(err);
    res.send(obj[0].teams[0].players);
  });
});

//POST add a new player for a specific team, requires user ID param, team ID param, and 'firstName', 'lastName' and 'sex' in req body
router.post("/api/:user/teams/:team/players", (req, res, next) => {
  const {user} = req.params;
  const {team} = req.params;

  User.find({_id: user}, {teams: {$elemMatch: {_id: team}}}).exec((err, obj) => {
    if (err) return next(err);
    obj[0].teams[0].players.push(req.body);
    obj[0].save((err) => {
      if (err) return next(err);
      console.log('Player successfully added.');
    });
  });
  res.end();
});

//GET a specific player from a team, requires user ID param, team ID param, and player ID param
router.get("/api/:user/teams/:team/players/:player", (req, res, next) => {
  const {user} = req.params;
  const {team} = req.params;
  const {player} = req.params;

  User.find(
    
    {}

  ).exec((err, obj) => {
    if (err) return next(err);
    res.send(obj[0].teams[0].players.filter(playr => playr._id == player));
  });
});

//PUT change a player's name/sex, requires user ID param, team ID param, player ID param, and 'firstName', 'lastName' and 'sex' in req body


module.exports = router;