var express = require('express');
var router = express.Router();

var tasks = [
    {id : 1, name : 'Watch a movie', isCompleted : false},
    {id : 2, name : 'Fix that bug', isCompleted : true},
    {id : 3, name : 'Plan for vacation', isCompleted : false}
];

/* GET users listing. */
router.get('/', function(req, res, next) {
    var viewData = { list : tasks};
    res.render('tasks/index', viewData);
});

module.exports = router;



