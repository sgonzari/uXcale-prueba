// useFetch.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useFetch } from './useFetch';

// Mock de la función fetch global
global.fetch = jest.fn();

describe('useFetch', () => {
    const url = '/meetups';

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should initialize with null data', () => {
        fetch.mockResolvedValueOnce({
            json: async () => ([]),
        });

        const { result } = renderHook(() => useFetch({ url }));

        expect(result.current.data).toBeNull();
    });

    test('should fetch data on mount', async () => {
        const mockData = [{ id: '1', name: 'Meetup 1' }];
        fetch.mockResolvedValueOnce({
            json: async () => mockData,
        });

        const { result, waitForNextUpdate } = renderHook(() => useFetch({ url }));

        await waitForNextUpdate();

        expect(result.current.data).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:3030${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    test('should update data correctly', async () => {
        const initialData = [{ id: '1', name: 'Meetup 1' }, { id: '2', name: 'Meetup 2' }];
        const updatedData = { id: '1', name: 'Updated Meetup 1' };

        fetch.mockImplementation((url, options) => {
            if (options.method === 'GET') {
                return Promise.resolve({ json: async () => initialData });
            } else if (options.method === 'PUT') {
                return Promise.resolve({ json: async () => updatedData });
            }
            return Promise.reject(new Error('Unknown method'));
        });

        const { result, waitForNextUpdate } = renderHook(() => useFetch({ url }));

        await waitForNextUpdate(); // Espera a que se cargue el data inicial

        act(() => {
            result.current.updateMeetup('1', { name: 'Updated Meetup 1' });
        });

        await waitForNextUpdate();

        expect(result.current.data).toEqual([updatedData, initialData[1]]);
    });

    test('should create new data correctly', async () => {
        const initialData = [{ id: '1', name: 'Meetup 1' }];
        const newMeetup = { id: '2', name: 'Meetup 2' };

        fetch.mockImplementation((url, options) => {
            if (options.method === 'GET') {
                return Promise.resolve({ json: async () => initialData });
            } else if (options.method === 'POST') {
                return Promise.resolve({ json: async () => newMeetup });
            }
            return Promise.reject(new Error('Unknown method'));
        });

        const { result, waitForNextUpdate } = renderHook(() => useFetch({ url }));

        await waitForNextUpdate(); // Espera a que se cargue el data inicial

        act(() => {
            result.current.createMeetup({ name: 'Meetup 2' });
        });

        await waitForNextUpdate();

        expect(result.current.data).toEqual([...initialData, newMeetup]);
    });
});
