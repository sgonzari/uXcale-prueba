import { render, screen, fireEvent } from '@testing-library/react';
import MainNavigation from './MainNavigation';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, BrowserRouter as Router, Routes } from 'react-router-dom';


jest.mock('framer-motion', () => {
    const actual = jest.requireActual('framer-motion');
    return {
        ...actual,
        motion: {
            header: ({ children, ...props }) => <header {...props}>{children}</header>,
        },
    };
});

describe('MainNavigation Component', () => {
    test('renders navigation links and favourite count', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <MainNavigation favouritesMeetups={5} />
            </MemoryRouter>
        );

        expect(screen.getByText('React Meetups')).toBeInTheDocument();
        expect(screen.getByText('All Meetup')).toBeInTheDocument();
        expect(screen.getByText('Add New Meetup')).toBeInTheDocument();
        expect(screen.getByText('My Favourites')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    test('applies activeNav class to active NavLink', () => {
        render(
            <MemoryRouter initialEntries={['/create']}>
                <MainNavigation favouritesMeetups={5} />
            </MemoryRouter>
        );

        const addNewMeetupLink = screen.getByText('Add New Meetup');
        expect(addNewMeetupLink).toHaveClass('activeNav');

        const allMeetupsLink = screen.getByText('All Meetup');
        expect(allMeetupsLink).not.toHaveClass('activeNav');

        const myFavouritesLink = screen.getByText('My Favourites');
        expect(myFavouritesLink).not.toHaveClass('activeNav');
    });

    test('applies activeNav class to active NavLink when route changes', () => {
        render(
            <MemoryRouter initialEntries={['/meetups']}>
                <Routes>
                    <Route path="/" element={<MainNavigation favouritesMeetups={5} />} />
                    <Route path="/meetups" element={<MainNavigation favouritesMeetups={5} />} />
                    <Route path="/create" element={<MainNavigation favouritesMeetups={5} />} />
                    <Route path="/favourites" element={<MainNavigation favouritesMeetups={5} />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('My Favourites'));
        expect(screen.getByText('My Favourites')).toHaveClass('activeNav');

        expect(screen.getByText('All Meetup')).not.toHaveClass('activeNav');
        expect(screen.getByText('Add New Meetup')).not.toHaveClass('activeNav');
    });

    test('changes header visibility on scroll', async () => {
        render(
            <Router>
                <MainNavigation favouritesMeetups={5} />
            </Router>
        );

        fireEvent.scroll(window, { target: { scrollY: 100 } });

        fireEvent.scroll(window, { target: { scrollY: 50 } });
    });
});
