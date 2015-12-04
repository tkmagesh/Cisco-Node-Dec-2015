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

router.get('/new', function(req, res, next){
    res.render('tasks/new');
});

router.post('/new', function(req, res, next){
    var taskName = req.body.txtTask;
    var newId = tasks.reduce(function(result, task){
        return result > task.id ? result : task.id;
    },0) + 1;
    var newTask = {
        id : newId,
        name : taskName,
        isCompleted : false
    };
    tasks.push(newTask);
    res.redirect('/tasks');
});

router.get('/toggle/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    var task = tasks.filter(function(t){
        return t.id === id;
    })[0];
    if (task)
        task.isCompleted = !task.isCompleted;
    res.redirect('/tasks');
});

module.exports = router;



