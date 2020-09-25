// Import the js file to test
import { handleSubmit } from '../src/client/js/formHandler'
import { validURL} from '../src/client/js/urlValidation'

import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests
describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        const event = { preventDefault: () => {} };
        jest.spyOn(event, 'preventDefault');
        event.preventDefault()
        expect(event.preventDefault).toBeCalled();
        expect(handleSubmit('http://localhost:8082/meaningCloud', {url: "https://www.wikipedia.org/"})).resolves.toBe({
            "polarity":"neutral"
          })
    })
});

describe('tests for url validation', () => {
    it('Returns true on valid url', () => {
        expect(validURL('https://www.legionisci.com/')).toBeTruthy();
    })

    it('Returns false on invalid url', () => {
        expect(validURL('invalid_url')).toBeFalsy();
    })
})
