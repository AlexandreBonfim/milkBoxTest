import { createTodo } from '../../../src/services';
import { DynamoDB } from 'aws-sdk';
jest.mock('uuidv4');
import { uuid } from 'uuidv4';

describe('Test createTodoHandler', () => {
    let putSpy;
    let uuidSpy;
    const mocked = uuid as jest.Mocked<typeof uuid>;  // <= tell TypeScript it's an auto-mocke;

    beforeAll(() => {
        // Mock dynamodb
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        putSpy = jest.spyOn(DynamoDB.DocumentClient.prototype, 'put');

        //Mock uuid
        //uuidSpy = jest.spyOn(uuid, 'uuid')
        // date = jest.spyOn(global.Date, 'now').mockReturnValue(
        //      new Date('2019-05-14T11:01:58.135Z').valueOf()
        // );
    });

    // Clean up mocks
    afterAll(() => {
        putSpy.mockRestore();
       // uuid.mockRestore();
        //date.mockRestore();
    });

    test('should create item', async () => {
        mocked.mockReturnValue('mocked result');  // <= use the properly typed mock

console.log(mocked);
        const item = {
          id: '',
          description: 'test 2',
          isCompleted: false,
          createdAt: 1,
          updatedAt: 1
        };

        uuidSpy.mockReturnValue('deb8438d-4b4e-402a-9d08-d2769dc7b564');

        // Return the specified value
        putSpy.mockReturnValue({
            promise: () => Promise.resolve({ Item: item })
        });


        const event = {
            body: {
              id: '',
              description: 'test x',
              isCompleted: false,
              createdAt: 1,
              updatedAt: 1
            }
        }

        // Invoke method, passing id
        const result = await createTodo(event.body);

        const expectedResult = {
            statusCode: 201,
            body: JSON.stringify(item)
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
        expect(result.statusCode).toBe(201);
    });
});
