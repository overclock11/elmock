"use strict";

const express = require('express');
const router = express.Router();
const ActionsController = require('./ActionsController');

class RestController {
    constructor(){
        this.actionsController = new ActionsController();
    }

    createServices(){
        router.get('/base', (req, res) => {
            this.actionsController.getContent(req.query.pageNumber, req.query.pageSize, req.query.filterBy, req.query.filterText).then((result)=>{
                res.status(200).json(result);
            }, (err) =>{
                res.status(500).json(err);
            })
        });


        router.put('/base/:field/:id', (req, res) => {
            this.actionsController.updateContent(req.params.field, req.params.id, req.body).then((result)=>{
                res.status(200).json(result);
            }, (err) =>{
                res.status(500).json(err);
            })
        });


        return router;
    }
}
module.exports = RestController;