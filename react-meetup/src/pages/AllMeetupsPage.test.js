import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AllMeetupsPage from './AllMeetupsPage';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";

const mockUseOutletContext = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useOutletContext: () => mockUseOutletContext(),
}));

describe('AllMeetupsPage Component', () => {
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
                <AllMeetupsPage />
            </MemoryRouter>
        );

        expect(screen.getByText('All Meetups')).toBeInTheDocument();
    });

    test('shows Loader when data is not available', () => {
        mockUseOutletContext.mockReturnValue({
            data: null,
            getMeetups: jest.fn(),
            updateMeetup: jest.fn(),
        });

        render(
            <MemoryRouter>
                <AllMeetupsPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders a list of MeetupItem components when data is available', async () => {
        const mockData = [
            { id: 1, title: 'Meetup 1', image: '', address: '', description: '', favourite: false },
            { id: 2, title: 'Meetup 2', image: '', address: '', description: '', favourite: false },
        ];
        const mockGetMeetups = jest.fn();
        const mockUpdateMeetup = jest.fn();

        mockUseOutletContext.mockReturnValue({
            data: mockData,
            getMeetups: mockGetMeetups,
            updateMeetup: mockUpdateMeetup,
        });

        render(
            <MemoryRouter>
                <AllMeetupsPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Meetup 1')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByText('Meetup 2')).toBeInTheDocument();
        });
    });

    test('calls getMeetups on component mount', () => {
        const mockData = null;
        const mockGetMeetups = jest.fn();
        const mockUpdateMeetup = jest.fn();

        mockUseOutletContext.mockReturnValue({
            data: mockData,
            getMeetups: mockGetMeetups,
            updateMeetup: mockUpdateMeetup,
        });

        render(
            <MemoryRouter>
                <AllMeetupsPage />
            </MemoryRouter>
        );

        expect(mockGetMeetups).toHaveBeenCalledTimes(1);
    });
});