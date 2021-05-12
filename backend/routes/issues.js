const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');

const IssuesController = require('../controllers/issues');

// router.get('/', IssuesController.issues_get_all);

// router.post('/', /*checkAuth, upload.single('productImage'),*/ IssuesController.issues_create_issue);

// router.get('/:issueId', IssuesController.issues_get_issue);

// router.patch('/:issueId', /*checkAuth,*/ IssuesController.issues_update_issue);

// router.delete('/:issueId', /*checkAuth,*/ IssuesController.issues_delete_issue);

router.route('/').get((req, res) => {
    Issue.find((err, issues) => {
        if(err)
           console.log(err);
        else {
           // console.log(issues);
           res.json(issues);
        }   
    });
}); 

/*
router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
      if(err)
       console.log(err);
     else
       res.json(issues);
    });
 });
 */

router.route('/:id').get((req, res) => {
    console.log('/:id ' + req.body.id);
    Issue.findById(req.params.id, (err, issue) => {
    if(err)
        res.json(err);
    else
        res.json(issue);
    });
}); 

router.route('/add').post((req, res) => {
    const issue = new Issue(req.body);
    // console.log(issue);
    issue.save().then(issue => {
        res.status(200).json({'issue': 'Added successfully'});
    })
    .catch(err => {
        res.status(400).send('Failed to create new record.');
    });
});

router.route('/update/:id').post((req, res) => {
    console.log('Routerissa: ', req.params.id);
    Issue.findById(req.params.id, (err, issue) => {
    if(!issue)
        return res.status(400).send('Failed to find the record.');
        // return next(new Error('Could not find document in database.'));
    else {
        // issue.id = req.body.id;
        issue.title = req.body.title;
        issue.reponsible = req.body.responsible;
        issue.description = req.body.description;
        issue.severity = req.body.severity;
        issue.status = req.body.status;
    
        issue.save().then(issue => {
            res.status(200).json({'issue': 'Updated successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to update the record.');
        });
    }
    });
}); 

router.route('/delete/:id').delete((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
    if(!issue)
        return res.status(400).send('Failed tu delete the record.');
    else {
        issue.remove().then(issue => {
            res.status(200).json({'issue': 'Removed successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to remove the record.');
        });
    }
    });
});
module.exports = router;