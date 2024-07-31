// MeetupItem.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import MeetupItem from './MeetupItem';
import '@testing-library/jest-dom';

// Mock de la función updateMeetup
const mockUpdateMeetup = jest.fn();

describe('MeetupItem Component', () => {
  const item = {
    id: '1',
    image: 'http://example.com/image.jpg',
    title: 'Test Meetup',
    address: '123 Test St',
    description: 'This is a test meetup.',
    favourite: false,
  };

  test('renders MeetupItem component correctly', () => {
    render(<MeetupItem item={item} updateMeetup={mockUpdateMeetup} />);

    // Verifica que todos los elementos se rendericen correctamente
    expect(screen.getByAltText(item.title)).toHaveAttribute('src', item.image);
    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText(item.address)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Add to favorites');
  });

  test('handles favourite button click correctly', () => {
    render(<MeetupItem item={item} updateMeetup={mockUpdateMeetup} />);

    // Verifica el texto inicial del botón
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Add to favorites');

    // Simula un clic en el botón
    fireEvent.click(button);

    // Verifica que la función updateMeetup sea llamada con los parámetros correctos
    expect(mockUpdateMeetup).toHaveBeenCalledWith(item.id, { ...item, favourite: !item.favourite });
  });

  test('updates button text when item is a favourite', () => {
    // Actualiza el objeto item para que el meetup sea un favorito
    const favouriteItem = { ...item, favourite: true };

    render(<MeetupItem item={favouriteItem} updateMeetup={mockUpdateMeetup} />);

    // Verifica que el texto del botón se actualice cuando el meetup es un favorito
    expect(screen.getByRole('button')).toHaveTextContent('Remove from favorites');
  });
});
