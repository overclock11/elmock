"use strict";
const express = require('express');
let router = express.Router();
const HotelsController = require('./HotelsController');

class RestController {
    constructor(){
        this.hotelsController = new HotelsController();
    }

    createServices(){
        router.get('/hotel', (req, res) => {
            this.hotelsController.allHotels().then((result)=>{
                res.status(200).json(result);
            }, (err) =>{
                res.status(500).json(err);
            })
        });
        router.get('/name/:name', (req, res) => {
            this.hotelsController.searchByName(req.params.name).then((result)=>{
                res.status(200).json(result);
            }, (err) =>{
                res.status(500).json(err);
            })
        });
        router.get('/stars/:stars', (req, res) => {
            this.hotelsController.searchByStars(req.params.stars).then((result)=>{
                res.status(200).json(result);
            }, (err) =>{
                res.status(500).json(err);
            })
        });
        console.log("Publicando recursos REST en /hotel");
        console.log("/name/:name");
        console.log("/stars/:stars");
        return router;
    }
}
module.exports = RestController;