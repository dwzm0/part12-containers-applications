/* eslint-disable testing-library/render-result-naming-convention */

import SingleTodo from "./SingleTodo";
import {cleanup,  render} from '@testing-library/react';


describe('Single todo renders correctly', () => {
    afterEach(cleanup);
    const todo = {
        _id: 213123123,
        text: "abracadabra",
        done: false 
    }

    it('I can see things', () => {
        const screen = render(
            <SingleTodo
                todo={todo}
                deleteTodo={() => {}}
                completeTodo={() => {}}
            />
        )

        expect(screen.getByText(todo.text)).toBeDefined()
        expect(screen.getByText('Delete')).toBeDefined()
        expect(screen.getByText('Set as done')).toBeDefined()
    })
})