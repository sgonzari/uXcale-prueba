import { render, screen, fireEvent } from '@testing-library/react';
import NewMeetupForm from './NewMeetupForm';
import '@testing-library/jest-dom';

const mockCreateMeetup = jest.fn();

describe('NewMeetupForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders form fields correctly', () => {
        render(<NewMeetupForm createMeetup={mockCreateMeetup} />);

        expect(screen.getByTestId('title-input')).toBeInTheDocument();
        expect(screen.getByTestId('image-input')).toBeInTheDocument();
        expect(screen.getByTestId('address-input')).toBeInTheDocument();
        expect(screen.getByTestId('description-input')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    test('submits form data correctly', () => {
        render(<NewMeetupForm createMeetup={mockCreateMeetup} />);

        fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Test Meetup' } });
        fireEvent.change(screen.getByTestId('image-input'), { target: { value: 'http://example.com/image.jpg' } });
        fireEvent.change(screen.getByTestId('address-input'), { target: { value: '123 Test St' } });
        fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'This is a test meetup.' } });

        fireEvent.click(screen.getByTestId('submit-button'));

        expect(mockCreateMeetup).toHaveBeenCalledTimes(1);
        expect(mockCreateMeetup).toHaveBeenCalledWith({
            title: 'Test Meetup',
            image: 'http://example.com/image.jpg',
            address: '123 Test St',
            description: 'This is a test meetup.',
        });
    });

    test('clears input fields after form submission', () => {
        render(<NewMeetupForm createMeetup={mockCreateMeetup} />);

        fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Test Meetup' } });
        fireEvent.change(screen.getByTestId('image-input'), { target: { value: 'http://example.com/image.jpg' } });
        fireEvent.change(screen.getByTestId('address-input'), { target: { value: '123 Test St' } });
        fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'This is a test meetup.' } });

        fireEvent.click(screen.getByTestId('submit-button'));

        expect(screen.getByTestId('title-input')).toHaveValue('');
        expect(screen.getByTestId('image-input')).toHaveValue('');
        expect(screen.getByTestId('address-input')).toHaveValue('');
        expect(screen.getByTestId('description-input')).toHaveValue('');
    });
});
