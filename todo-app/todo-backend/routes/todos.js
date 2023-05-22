const express = require('express');
const { Todo } = require('../mongo')
const {setAsync, getAsync} = require('../redis/index')
const router = express.Router();

/* GET todos listing. */

const todoCounter = async () => {
  const count = await getAsync("count")
  return count ? setAsync("count", parseInt(count) + 1) : setAsync("count", 1)
}

router.get('/', async (_, res) => {

  const todos = await Todo.find({})
  res.send(todos);
});

router.get('/statistics', async (_, res) => {
  const count = await getAsync("count")
  count === null? setAsync("count", 0) : count

  return res.json({"added_todos": count})
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  todoCounter()

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })


  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const {text, done} = req.body 
  const updatedTodo = {
    text: text? text : req.todo.text,
    done: 'done' in req.body? done : req.todo.done
  }
  console.log(req.body);
  console.log(req.todo);
  console.log(updatedTodo);
  req.todo.overwrite({text: updatedTodo.text, done: updatedTodo.done})
  await req.todo.save()
  res.sendStatus(200) 
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
