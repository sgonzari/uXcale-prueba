import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Favorites from './Favorites';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";

const mockUseOutletContext = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useOutletContext: () => mockUseOutletContext(),
}));

describe('Favorites Component', () => {
    beforeEach(() => {
        mockUseOutletContext.mockReset();
    });

    test('renders the page with title', () => {
        mockUseOutletContext.mockReturnValue({
            data: null,
            getMeetups: jest.fn(),
            updateMeetup: jest.fn(),
        });

        render(
            <MemoryRouter>
                <Favorites />
            </MemoryRouter>
        );

        expect(screen.getByText('Favourites Page')).toBeInTheDocument();
    });

    test('shows no favourites when data is not available', () => {
        mockUseOutletContext.mockReturnValue({
            favouritesMeetups: [],
            updateMeetup: jest.fn(),
        });

        render(
            <MemoryRouter>
                <Favorites />
            </MemoryRouter>
        );

        expect(screen.getByText('No favourites')).toBeInTheDocument();
    });

    test('renders a list of favourites MeetupItem components when data is available', async () => {
        const mockData = [
            { id: 1, title: 'Meetup 1', image: '', address: '', description: '', favourite: true },
            { id: 3, title: 'Meetup 3', image: '', address: '', description: '', favourite: true },
        ];
        const mockUpdateMeetup = jest.fn();

        mockUseOutletContext.mockReturnValue({
            favouritesMeetups: mockData,
            updateMeetup: mockUpdateMeetup,
        });

        render(
            <MemoryRouter>
                <Favorites />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Meetup 1')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByText('Meetup 3')).toBeInTheDocument();
        });
    });
});