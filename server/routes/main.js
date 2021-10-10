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
  })
});



module.exports = router;