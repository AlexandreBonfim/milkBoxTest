import { getTodo } from '../../../src/services';
import { DynamoDB } from 'aws-sdk';

describe('Test getTodoHandler', () => {
    let getSpy;

    beforeAll(() => {
        // Mock dynamodb
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        getSpy = jest.spyOn(DynamoDB.DocumentClient.prototype, 'get');
    });

    // Clean up mocks
    afterAll(() => {
        getSpy.mockRestore();
    });

    test('should find nothing', async () => {
        const item = undefined;

        // Return the specified value
        getSpy.mockReturnValue({
            promise: () => Promise.resolve({ Item: item })
        });

        const event = {
            pathParameters: { id: '2' }
        }

        // Invoke method, passing id
        const result = await getTodo(event.pathParameters.id);

        const expectedResult = {
          statusCode: 404,
          body: JSON.stringify({
            message: 'Couldn\'t fetch the todo item',
          })
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
        expect(result.statusCode).toBe(404);
    });

    test('should get item by id', async () => {
        const item = {
            id: '1',
            description: 'test 1',
            isCompleted: false
          };

        // Return the specified value
        getSpy.mockReturnValue({
            promise: () => Promise.resolve({ Item: item })
        });

        const event = {
            pathParameters: { id: '1' }
        }

        // Invoke method, passing id
        const result = await getTodo(event.pathParameters.id);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(item)
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
        expect(result.statusCode).toBe(200);
    });
});
