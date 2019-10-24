"use strict";

const express = require('express');
const router = express.Router();
const ActionsController = require('./ActionsController');

class RestController {
    constructor(){
        this.actionsController = new ActionsController();
    }

    createServices(apiName = '/base'){
        router.get(apiName, (req, res) => {
            this.actionsController.getContent(req.query.pageNumber, req.query.pageSize, req.query.filterBy, req.query.filterText).then((result)=>{
                res.status(200).json(result);
            }, (err) =>{
                res.status(500).json(err.message);
            })
        });


        router.put(apiName+'/:field/:id', (req, res) => {
            this.actionsController.updateContent(req.params.field, req.params.id, req.body).then((result)=>{
                res.status(200).json(result);
            }, (err) =>{
                res.status(500).json(err.message);
            })
        });


        router.delete(apiName+'/:field/:id', (req, res) => {
            this.actionsController.deleteContent(req.params.field, req.params.id).then((result)=>{
                res.status(200).json(result);
            }, (err) =>{
                if (err === 204) {
                    res.status(204).json();
                } else {
                    res.status(500).json(err.message);
                }
            })
        });


        router.post(apiName, (req, res) => {
            this.actionsController.addContent(req.body).then((result)=>{
                res.status(200).json(result);
            }, (err) =>{
                res.status(500).json(err.message);
            })
        });
        console.log("levantando base");
        return router;
    }
}
module.exports = RestController;