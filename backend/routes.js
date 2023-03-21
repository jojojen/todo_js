const express = require("express")
const Todo = require("./model/Todo")
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         done:
 *           type: boolean
 *       required:
 *         - title
 *         - done
 *       example:
 *         _id: 507f1f77bcf86cd799439011
 *         title: Buy milk
 *         done: false
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: All todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/todos", async (req, res) => {
    const todos = await Todo.find()
    res.send(todos)
})


/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: A Todo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.get("/todos/:id", async (req, res) => {
    try {
        const todo = await Todo.find({ _id: req.params.id })
        res.send(todo) 
    } catch {
        res.status(404)
        res.send({ error: "Todo does not exist!"})
    }
})

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Add a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: A todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post("/todos", async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        done: req.body.done,
    })
    await todo.save()
    res.send(todo)
})

/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     summary: Update a todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: A todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.patch("/todos/:id", async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id })
        if(req.body.title) {
            todo.title = req.body.title
        }
        if(req.body.done) {
            todo.done = req.body.done
        }
        await todo.save()
        res.send(todo)
    } catch (err) {
        res.status(404)
        res.send({ error: err})
    }
})

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 */
router.delete("/todos/:id", async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id })
        res.status(200).send({ success: "Todo deleted!"})
    } catch {
        res.status(404)
        res.send({ error: "Todo does not exist!" })
    }
})

module.exports = router