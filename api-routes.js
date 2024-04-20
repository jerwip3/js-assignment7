const router = require('express').Router()
const { getCollection, ObjectId } = require('./todos-db')

// GET /api/todos
router.get('/', async (_, response) => {

    const collection = await getCollection('todo-api', 'todos')
    const todos = await collection.find({}).toArray()
    response.json(todos)
})

// POST /api/todos
router.post('/', async (request, response) => {
    const { item } = request.body
    const complete = false
    const collection = await getCollection('todo-api', 'todos')
    await collection.insertOne({ item, complete })
    response.json({ message: 'New todo added!' })
})

// PUT /api/todos/:id
router.put('/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getCollection('todo-api', 'todos')
    const todo = await collection.findOne({ "_id": new ObjectId(id) })
    await collection.updateOne({ "_id": new ObjectId(id) }, { "$set": { "complete": !todo.complete } })
    response.json({ message: 'Todo updated!' })
})

module.exports = router