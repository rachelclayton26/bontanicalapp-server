const Express = require('express');
const router = Express.Router();
let validateJWTAdmin = require('../middleware/validate-jwt');
const { FavModel, PlantModel } = require('../models');

/*
====================
LIKE ROUTE
====================
*/
router.post('/addfav', validateJWTAdmin, async (req, res) => {
    // console.log("create item")
    const {
        userId,
        plantId
        } = req.body.fav;
    // const {id} = req.admin;
    const favEntry = {
        userId,
        plantId
    }
    try {
        const newFav = await FavModel.create(favEntry);
        res.status(200).json(newFav);
    } catch (err) {
        console.log(err, favEntry)
        res.status(500).json({error: err});
    }
  });


  /*
  ====================
  GET FAVS BY USERID
  ====================
  */

  router.get("/getfav/:userId", async (req, res) => {
    try {
      const favPlants = await FavModel.findAll({
        where: {
          userId: req.params.userId,
        },
      });
      console.log(req.params.id)
  
      res.status(200).json({
        message: "Got it!",
        favPlants,
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to retrieve the favorites: ${err}`,
      });
    }
  });

/*
===============================
DELETE FAV
===============================
*/

router.delete("/deletefav/:plantId", validateJWTAdmin, async(req, res) => {
    const plantId = req.params.plantId;
  
    try{
    const query = {
            where: { 
                plantId: plantId,
             }
        };
        let plant= await FavModel.findOne(query)
        if(plant){
            console.log(plant)
            plant.destroy();
        }
            res.status(200).json({message: "Fav Plant Removed"});
        } catch (err) {
            console.log(err)
        res.status(500).json({error: err});
    }
  });

  module.exports = router;