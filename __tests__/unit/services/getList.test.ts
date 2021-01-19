import { getTodoList } from '../../../src/services';
import { DynamoDB } from 'aws-sdk';

describe('Test getTodoListHandler', () => {
    let scanSpy;

    beforeAll(() => {
        // Mock dynamodb
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        scanSpy = jest.spyOn(DynamoDB.DocumentClient.prototype, 'scan');
    });

    // Clean up mocks
    afterAll(() => {
        scanSpy.mockRestore();
    });

    test('should return todos', async () => {
      // Mock response
      const items = [
          {
            id: '1',
            description: 'test 1',
            isCompleted: false
          },
          {
            id: '2',
            description: 'test 2',
            isCompleted: true
          }
        ];

        // Return the specified value
        scanSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: items })
        });

        const pageSize = 10;

        // Invoke method, passing pageSize
        const result = await getTodoList(pageSize);

        const response = {
          items: items,
        };

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(response)
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
        expect(result.statusCode).toEqual(200);
    });
});
