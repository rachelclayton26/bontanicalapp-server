const Express = require('express');
const router = Express.Router();
let validateJWTAdmin = require('../middleware/validate-jwt');
const { PlantModel } = require('../models');

/*
====================
practice route
====================
*/

router.get('/practice', validateJWTAdmin, (req, res) => {
    res.send("Hey! I'm practicing making routes!")
});

/*
===============================
   Admin Create Plant Entry
===============================
*/

//Rachel

router.post('/create', validateJWTAdmin, async (req, res) => {
  // console.log("create item")
  const {commonPlantName, scientificPlantName, growthZone, img, img2, img3, water, soil, sun, indoor, color, description} = req.body.plant;
  // const {id} = req.admin;
  const plantEntry = {
      commonPlantName,
      scientificPlantName,
      growthZone,
      img,
      img2,
      img3,
      water,
      soil,
      sun,
      indoor,
      color,
      description
      // owner: id
  }
  plantEntry.growthZone = growthZone.split(",").map(s => {
    return isNaN(parseInt(s)) ? 0: parseInt(s)
  })

  try {
      const newPlant = await PlantModel.create(plantEntry);
      res.status(200).json(newPlant);
  } catch (err) {
      console.log(err, plantEntry)
      res.status(500).json({error: err});
  }
  
});

//Validate-session: Line 106 contains a requirement of validateJWTAdmin. This checks the sessionToken created upon login, extracts the id and session from the payload, and verifies that this user has access to the given route. Here, it checks if the user trying to create a shop item is an admin with valid credentials.

/*
===============================
   Update a Plant Entry
===============================
*/

//Rachel

router.put("/:id", validateJWTAdmin, async(req, res) => {
  const {commonPlantName, scientificPlantName, growthZone, img, img2, img3, water, soil, sun, indoor, color, description} = req.body.plant;
  const plantId = req.params.id;

  const query = {
          where: { 
              id: plantId,
           }
      };
      
      const updatedPlant = {
          commonPlantName,
          scientificPlantName,
          growthZone,
          img,
          img2,
          img3,
          water,
          soil,
          sun,
          indoor,
          color,
          description
      };

      updatedPlant.growthZone = growthZone.split(",").map(s => {
        return isNaN(parseInt(s)) ? 0: parseInt(s)
      })

      try {
          const update = await PlantModel.update(updatedPlant, query);
          res.status(200).json(update);
      } catch (err) {
      res.status(500).json({error: err});
  }
});

/*
===============================
    Delete a Plant Entry
===============================
*/

//Rachel

router.delete("/:id", validateJWTAdmin, async(req, res) => {
  const plantId = req.params.id;

  try{
  const query = {
          where: { 
              id: plantId,
           }
      };
      
      await PlantModel.destroy(query);
          res.status(200).json({message: "Plant Removed"});
      } catch (err) {
      res.status(500).json({error: err});
  }
});

/* 
====================
Get ALL PLANT ITEMS - main view
====================
*/
router.get("/getAll", async (req, res) => {
    try {
      const flower = await PlantModel.findAll();
      res.status(200).json(flower);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

/* 
====================
Get PLANT BY ID
====================
*/
router.get("/id/:id", async (req, res) => {
  try {
    const plantDetail = await PlantModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log(req.params.id)

    res.status(200).json({
      message: "Got it!",
      plantDetail,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to retrieve the plant: ${err}`,
    });
  }
});

/* 
====================
Get PLANT BY NAME
====================
*/
router.get("/name", async (req, res) => {
    try {
      const plantDetail = await PlantModel.findOne({
        where: {
          commonPlantName: req.body.plant.commonPlantName,
        },
      });
      console.log(req.params.commonPlantName)
  
      res.status(200).json({
        message: "Got it!",
        plantDetail,
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to retrieve the plant: ${err}`,
      });
    }
  });

/*
====================
Get PLANT BY ZONE
====================
*/
router.get("/zone/:growthZone", async (req, res) => {
    try {
      console.log(req.params.growthZone)
      const plantDetail = await PlantModel.findAll();
      let plantByZone= []
      for(let i = 0; i < plantDetail.length; i++) {
        const numberZone= Number(req.params.growthZone)
        console.log(numberZone)
        if(plantDetail[i].growthZone.includes(numberZone)){
              plantByZone.push(plantDetail[i])
          }
      }

      console.log(plantByZone)
  
      res.status(200).json({
        message: "Got it!",
        plantByZone,
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to retrieve the plant: ${err}`,
      });
    }
  });

module.exports = router;