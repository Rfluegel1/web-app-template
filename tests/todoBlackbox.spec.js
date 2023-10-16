import {Todo} from '../src/todo'

let PocketBase = require('pocketbase/cjs')

let baseURL = 'http://127.0.0.1:8090'
const pocketbase = new PocketBase(baseURL)

jest.setTimeout(30000);

describe('Todo resource', () => {
    it('is created, fetched, updated, and deleted', async () => {
        // given
        const todo = new Todo('clean')

        const updateTodo = new Todo('clean the dishes')

        // when
        const createResponse = await pocketbase.collection('todos').create(todo)

        // then
        expect(createResponse).toBeTruthy()
        expect(createResponse.task).toEqual('clean')

        // when
        const id = createResponse.id
        const getResponse = await pocketbase.collection('todos').getOne(id)

        // then
        expect(getResponse).toBeTruthy()
        expect(getResponse.task).toEqual('clean')

        // when
        const updateResponse = await pocketbase.collection('todos').update(id, updateTodo)

        // then
        expect(updateResponse).toBeTruthy()
        expect(updateResponse.task).toEqual('clean the dishes')

        // when
        const deleteResponse = await pocketbase.collection('todos').delete(id)

        // then
        expect(deleteResponse).toEqual(true)

        // when
        let getResponseAfterDelete
        try {
            getResponseAfterDelete = await pocketbase.collection('todos').getOne(id)
        } catch(error) {
            getResponseAfterDelete = error
        }

        // then
        expect(getResponseAfterDelete.status).toEqual(404)
    })
})