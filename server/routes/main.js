const router = require("express").Router();
const { response } = require("express");
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
router.post("/api/teams", (req, res) => {
  const newTeam = new Team();

  newTeam.login = req.body.login;
  newTeam.password = req.body.password;
  newTeam.teamName = 'Your Team';
  newTeam.settings.push({
    numInnings: 7,
      positions: ["-", "P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RCF", "RF"],
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


  async function compareTeams() {

    let promise = new Promise((resolve, reject) => {
      Team.find({login: req.body.login}).exec((err, response) => resolve(response))
    });
  
    let result = await promise;
  
    if(result.length === 0) {
      newTeam.save((err) => {
        if (err) return next(err);
        console.log('Team successfully added.');
        });
      }
    }
  
  compareTeams()

  res.end();
});

//GET a specific team, requires team ID param
router.get("/api/teams/:team", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    res.send(teamRes[0])
  });
});

//GET a specific team, requires 'login' and 'password' in req body
router.post("/api/team", (req, res, next) => {
  Team.find({login: req.body.login, password: req.body.password}).exec((err, teamRes) => {
    if (err) return next(err);
    res.send(teamRes[0]);
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

//PUT edit a team's login info, requires team Id param and 'login' and 'password' in req body
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

//GET all players from a team, requires team ID param
          //optional sorting queries: ?sort=name, ?sort=sex, ?sort=availability
router.get("/api/teams/:team/players", (req, res, next) => {
  const {team} = req.params;
  const sortQuery = req.query.sort || null;

  Team.find({_id: team})
  .exec((err, teamRes) => {
    if (err) return next(err);
    const compareSex = (a,b) => {
      if ( a.sex < b.sex ) {return -1};
      if ( a.sex > b.sex ) {return 1};
      return 0;
    }
    const compareAvailability = (a,b) => {
      if ( a.availability < b.availability ) {return 1};
      if ( a.availability > b.availability ) {return -1};
      return 0;
    }

    if (!sortQuery || sortQuery.toLowerCase() == 'name') {
      return res.send(teamRes[0].players.sort());
    }
    if (sortQuery.toLowerCase() == 'sex') {
      return res.send(teamRes[0].players.sort(compareSex));
    }
    if (sortQuery.toLowerCase() == 'availability') {
      return res.send(teamRes[0].players.sort(compareAvailability));
    }
  });
});

//POST add a new player to a team, requires team ID param and 'firstName', 'lastName' and 'sex' in req body
router.post("/api/teams/:team/players", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].players.push({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      sex: req.body.sex,
      availability: true,
      preferredPos: [],
      lineup: ["-","-","-","-","-","-","-"],
      battingOrder: null
    });
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Player successfully added to team.');
    });
  });
  res.end();
});

//GET a specific player from a team, requires team ID param and player ID param
router.get("/api/teams/:team/players/:player", (req, res, next) => {
  const {team} = req.params;
  const {player} = req.params;

  Team.find({_id: team}, {players: {$elemMatch: {_id: player}}}).exec((err, teamRes) => {
    if (err) return next(err);
    res.send(teamRes[0].players[0]);
  });
});

//DELETE a specific player from a team, requires team ID param and player ID param
router.delete("/api/teams/:team/players/:player", (req, res, next) => {
  const {team} = req.params;
  const {player} = req.params;

  Team.update({_id: team}, {$pull: {players: {_id: player}}}).exec((err, teamRes) => {
    if (err) return next(err);
  })
  res.end();
});

//PUT change a player's first name, requires team ID param, player ID param, and 'firstName' in req body
router.put("/api/teams/:team/players/:player/firstName", (req, res, next) => {
  const {team} = req.params;
  const {player} = req.params;

  Team.find({_id: team}, {players: {$elemMatch: {_id: player}}}
  ).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].players[0].firstName = req.body.firstName;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Player first name successfully changed.');
    });
  });
  res.end();
});

//PUT change a player's last name, requires team ID param, player ID param, and 'lastName' in req body
router.put("/api/teams/:team/players/:player/lastName", (req, res, next) => {
  const {team} = req.params;
  const {player} = req.params;

  Team.find({_id: team}, {players: {$elemMatch: {_id: player}}}
  ).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].players[0].lastName = req.body.lastName;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Player last name successfully changed.');
    });
  });
  res.end();
});

//PUT change a player's sex, requires team ID param, player ID param, and 'sex' in req body
router.put("/api/teams/:team/players/:player/sex", (req, res, next) => {
  const {team} = req.params;
  const {player} = req.params;

  Team.find({_id: team}, {players: {$elemMatch: {_id: player}}}
  ).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].players[0].sex = req.body.sex;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Player sex successfully changed.');
    });
  });
  res.end();
});

//PUT change a player's availability, requires team ID param and player ID param
router.put("/api/teams/:team/players/:player/availability", (req, res, next) => {
  const {team} = req.params;
  const {player} = req.params;

  Team.find({_id: team}, {players: {$elemMatch: {_id: player}}}
  ).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].players[0].availability = !teamRes[0].players[0].availability;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Player availability successfully changed.');
    });
    res.send(teamRes[0].players[0]);
  });
});

//PUT change a player's preferred positions, requires team ID param, player ID param, and 'preferredPos' object key with array value in req body
router.put("/api/teams/:team/players/:player/preferredPos", (req, res, next) => {
  const {team} = req.params;
  const {player} = req.params;

  Team.find({_id: team}, {players: {$elemMatch: {_id: player}}}
  ).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].players[0].preferredPos = req.body.preferredPos;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Player position preferences successfully changed.');
    });
  });
  res.end();
});

//GET a specific player's lineup, requires team ID param and player ID param
router.get("/api/teams/:team/players/:player/lineup", (req, res, next) => {
  const {team} = req.params;
  const {player} = req.params;

  Team.find({_id: team}, {players: {$elemMatch: {_id: player}}}).exec((err, teamRes) => {
    if (err) return next(err);
    res.send(teamRes[0].players[0].lineup);
  });
});

//PUT change a specific player's lineup, requires team ID param, player ID param and 'position' and 'arrayNumber' object keys in req body
router.put("/api/teams/:team/players/:player/lineup", (req, res, next) => {
  const {team} = req.params;
  const {player} = req.params;

  Team.find({_id: team}, {players: {$elemMatch: {_id: player}}}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].players[0].lineup[req.body.arrayNumber] = req.body.position;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Player lineup successfully changed.');
    });
  });
  res.end();
});

//PUT change a specific player's batting order, requires team ID param, player ID param and 'battingOrder' in req body
router.put("/api/teams/:team/players/:player/battingOrder", (req, res, next) => {
  const {team} = req.params;
  const {player} = req.params;

  Team.find({_id: team}, {players: {$elemMatch: {_id: player}}}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].players[0].battingOrder = req.body.battingOrder;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Player batting order successfully changed.');
    });
  });
  res.end();
});

//GET all settings of a team, requires team ID param
router.get("/api/teams/:team/settings", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    res.send(teamRes[0].settings[0]);
  });
});

//PUT change inning number settings of a team, requires team ID param and 'numInnings' in req body
router.put("/api/teams/:team/settings/numInnings", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].settings[0].numInnings = req.body.numInnings;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Inning number settings successfully changed.');
    });
  });
  res.end();
});

//PUT change position settings of a team, requires team ID param and 'positions' object key with array value in req body
router.put("/api/teams/:team/settings/positions", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].settings[0].positions = req.body.positions;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Position settings successfully changed.');
    });
  });
  res.end();
});

//PUT change player minimum settings of a team, requires team ID param and 'minPlayers' in req body
router.put("/api/teams/:team/settings/minPlayers", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].settings[0].minPlayers = req.body.minPlayers;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Player minimum settings successfully changed.');
    });
  });
  res.end();
});

//PUT change sex minimum settings of a team, requires team ID param and 'sex' and 'min' in req body
router.put("/api/teams/:team/settings/sexMin", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].settings[0].sexMin = req.body;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Sex minimum settings successfully changed.');
    });
  });
  res.end();
});

//PUT change infield settings of a team, requires team ID param and 'sex' and 'min' in req body
router.put("/api/teams/:team/settings/infieldReq", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].settings[0].infieldReq = req.body;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Infield settings successfully changed.');
    });
  });
  res.end();
});

//PUT change outfield settings of a team, requires team ID param and 'sex' and 'min' in req body
router.put("/api/teams/:team/settings/outfieldReq", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].settings[0].outfieldReq = req.body;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Outfield settings successfully changed.');
    });
  });
  res.end();
});

//PUT change batting settings of a team, requires team ID param and 'sex' and 'min' in req body
router.put("/api/teams/:team/settings/battingReq", (req, res, next) => {
  const {team} = req.params;

  Team.find({_id: team}).exec((err, teamRes) => {
    if (err) return next(err);
    teamRes[0].settings[0].battingReq = req.body;
    teamRes[0].save((err) => {
      if (err) return next(err);
      console.log('Batting settings successfully changed.');
    });
  });
  res.end();
});

module.exports = router;