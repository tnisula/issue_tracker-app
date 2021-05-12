const mongoose = require('mongoose');
const Issue = require('../models/issue');

exports.issues_get_all = (req, res, next) => {
    console.log('get all issues');
    Issue.find()
      .select('title responsible description severity status _id')
      .exec()
      .then(docs => {
        const response = {
            count: docs.length,
            issues: docs.map(doc => {
                return {
                    title: doc.title,
                    responsible: doc.responsible,
                    description: doc.description,
                    severity: doc.severity,
                    status: doc.status,
                    _id: doc._id,
                    request:{
                        type: 'GET',
                        url:  'http://localhost:3000/issues' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
};

exports.issues_create_issue = (req, res, next) => {
    const issue = new Issue({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      responsible: req.body.responsible,
      description: req.body.description,
      severity: req.body.severity,
      status: req.body.status
    });
    issue.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: 'Created issue successfully',
          createdIssue: {
            title: result.title,
            responsible: result.responsible,
            description: result.description,
            severity: result.severity,
            status: result.status,
            _id: result._id,
            request: {
              type: 'POST',
              url:  'http://localhost:3000/issues/' + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
      });
  }); 
};

exports.issues_get_issue = (req, res, next) => {
    const id = req.params.issueId;
    console.log(id);
    Issue.findById({_id: id})
      .select('title responsible description severity status _id')
      .exec()
      .then(doc => {
        console.log("From database ", doc);
        if(doc) {
          res.status(200).json({
            issue: doc,
            request: {
              type: 'GET',
              url:  'http://localhost:3000/issues/' + doc._id
            }
          });
        } else {
          res.status(404).json({message: 'No valid entry found for provided ID'});
        }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({error: err});
      });
};

exports.issues_update_issue = (req, res, next) => {
    const id = req.params.issueId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
      // console.log("ops.value : " + ops.value);
    }
    Issue.updateOne({_id: id}, {$set: updateOps})
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Issue updated',
            request: {
                type: 'PATCH',
                url:  'http://localhost:3000/issues/' + id
              }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
      });
    }); 
};

exports.issues_delete_issue = (req, res, next) => {
    const id = req.params.issueId;
    
    Issue.deleteOne({_id: id}) // remove({_id: id})
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Issue deleted',
            request: {
              type: 'POST',
              url:  'http://localhost:3000/issues',
              body: {title: "String", 
                     responsible: "String",
                     description: "String",
                     severity: "String",
                     status: "String"}
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };