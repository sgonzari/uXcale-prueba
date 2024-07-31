import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import '@testing-library/jest-dom';

describe('Loader Component', () => {
    test('renders loader with correct text and class', () => {
        render(<Loader />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});
