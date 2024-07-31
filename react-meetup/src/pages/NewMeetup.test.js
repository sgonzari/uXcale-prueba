import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewMeetup from './NewMeetup';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";

const mockUseOutletContext = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useOutletContext: () => mockUseOutletContext(),
}));

describe('NewMeetup Component', () => {
    beforeEach(() => {
        mockUseOutletContext.mockReset();
    });

    test('renders the page with title', () => {
        mockUseOutletContext.mockReturnValue({
            createMeetup: jest.fn()
        });

        render(
            <MemoryRouter>
                <NewMeetup />
            </MemoryRouter>
        );

        expect(screen.getByText('Add New Meetup')).toBeInTheDocument();
    });
});