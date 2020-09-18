// Import the js file to test
import { handleSubmit } from '../src/client/js/formHandler'
import { validURL} from '../src/client/js/urlValidation'

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests
describe("Testing the submit functionality", () => {  
    test("Testing the handleSubmit() function", () => {
           expect(handleSubmit).toBeDefined();
})});

describe('tests for url validation', () => {
    it('Returns true on valid url', () => {
        expect(validURL('https://www.legionisci.com/')).toBe(true);
    })

    it('Returns false on invalid url', () => {
        expect(validURL('invalid_url')).toBe(false);
    })
})
