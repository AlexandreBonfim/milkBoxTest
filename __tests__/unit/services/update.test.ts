import { updateTodo } from '../../../src/services';
import { DynamoDB } from 'aws-sdk';

// This includes all tests for putItemHandler()
describe('Test putTodoHandler', function () {
    let putSpy;

    beforeAll(() => {
        // Mock dynamodb
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        putSpy = jest.spyOn(DynamoDB.DocumentClient.prototype, 'put');
    });

    // Clean up mocks
    afterAll(() => {
        putSpy.mockRestore();
    });

test('should break wrong type', async () => {
        const returnedItem = undefined;

        // Return the specified value
        putSpy.mockReturnValue({
            promise: () => Promise.resolve(returnedItem)
        });

        const event = {
            pathParameters: { id: '1' },
            body: {
              id: '1',
              description: 21,
              isCompleted: 'true'
            }
        };

        // Invoke method, passing id and todo
        const result = await updateTodo(event.pathParameters.id, event.body);

        const expectedResult = {
            statusCode: 400,
            body: JSON.stringify({
            message: 'Couldn\'t update the todo item',
          })
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
        expect(result.statusCode).toBe(400);
    });

    test('should update isCompleted', async () => {
        const returnedItem = {
          id: '1',
          description: 'test 1',
          isCompleted: true
        };

        // Return the specified value
        putSpy.mockReturnValue({
            promise: () => Promise.resolve(returnedItem)
        });

        const event = {
            pathParameters: { id: '1' },
            body: {
              id: '1',
              description: 'test 1',
              isCompleted: true
            }
        };

        // Invoke method, passing id and todo
        const result = await updateTodo(event.pathParameters.id, event.body);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(returnedItem)
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
        expect(result.statusCode).toBe(200);
    });
});
