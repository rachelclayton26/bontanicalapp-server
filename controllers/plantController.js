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
  try {
      const newPlant = await PlantModel.create(plantEntry);
      res.status(200).json(newPlant);
  } catch (err) {
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
  const plantName = req.params.commonPlantName;

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
router.get("/", async (req, res) => {
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
        //maybe we add an event listener to get the :id once the client side can be connected 
      },
    });

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
router.get("name/:name", async (req, res) => {
    try {
      const plantDetail = await PlantModel.findOne({
        where: {
          name: req.params.commonPlantName,
          //maybe we add an event listener to get the :id once the client side can be connected 
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
router.get("zone/:zone", async (req, res) => {
    try {
      const plantDetail = await PlantModel.findOne({
        where: {
          zone: req.params.growthZone,
        },
      });
  
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

module.exports = router;