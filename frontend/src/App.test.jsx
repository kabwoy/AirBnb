// This file can be deleted if you'd like
import React from 'react';
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import store from './app/store'
import App from './App';
import LoginScreen from './components/login/LoginScreen';
import { Provider } from 'react-redux';
import RegisterScreen from './components/register/RegisterScreen';
import { MemoryRouter } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import CreateListing from './components/listings/CreateListing';
import axios from 'axios';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/o/i); // random letter
  expect(linkElement).toBeInTheDocument();
});

describe('LoginScreen component', () => {
  beforeEach(() => {
    
    store.dispatch(reset());
  });

  test('renders LoginScreen component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );


    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'testpassword' },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /Sign in/i }));
    await waitFor(() => {
      const state = store.getState().auth;
      expect(state.success).toBe(true);
      expect(screen.getByText(/Login Successful/i)).toBeInTheDocument();
    });
  });

 
});

// FOR REGISTRATION


describe('RegisterScreen component', () => {
  beforeEach(() => {
    
    store.dispatch(reset());
  });

  test('renders RegisterScreen component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    
    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'testpassword' },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /Sign up/i }));

  
    await waitFor(() => {
      const state = store.getState().auth;
     
      expect(state.success).toBe(true);
      expect(screen.getByText(/Details submitted successfully/i)).toBeInTheDocument();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});


//LOGOUT



describe('useAuth hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('returns null when user details are not in local storage', () => {
    jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValueOnce(null);

    const result = useAuth();

    expect(result).toBeNull();
  });

  test('returns user details when available in local storage', () => {
    const mockUserDetails = { id: 1, username: 'testuser' };

    jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValueOnce(JSON.stringify(mockUserDetails));

    const result = useAuth();

    expect(result).toEqual(mockUserDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});


//FOR CREATING LISTINGS

describe('CreateListing component', () => {
  beforeEach(() => {
    store.dispatch(reset());
  });

  test('renders CreateListing component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateListing />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Create Listing/i)).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateListing />
        </MemoryRouter>
      </Provider>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Sample Listing' },
    });
    fireEvent.change(screen.getByLabelText(/Address/i), {
      target: { value: 'Sample Address' },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText(/Thumbnail/i), {
      target: { value: 'sample-thumbnail-url' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Listing/i }));


    await waitFor(() => {

      const state = store.getState().listings;
      expect(state.success).toBe(true);
      expect(screen.getByText(/Listing added successfully/i)).toBeInTheDocument();
    });
  });


});


//GETTING ALL BOOKINGS

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('BookingScreen component', () => {
  test('renders bookings', async () => {
 
    axios.get.mockResolvedValue({
      data: {
        bookings: [
          {
            id: 'test-booking-id',
            listingId: 'test-listing-id',
            status: 'pending',
            totalPrice: 100,
          },
       
        ],
      },
    });

    render(
      <MemoryRouter>
        <BookingScreen />
      </MemoryRouter>
    );

    
    await waitFor(() => {
      expect(screen.getByText(/test-booking-id/i)).toBeInTheDocument();
      expect(screen.getByText(/test-listing-id/i)).toBeInTheDocument();
      expect(screen.getByText(/pending/i)).toBeInTheDocument();
      expect(screen.getByText(/100/i)).toBeInTheDocument();
     
    });
  });

  test('handles booking acceptance', async () => {
    axios.get.mockResolvedValue({
      data: {
        bookings: [
          {
            id: 'test-booking-id',
            listingId: 'test-listing-id',
            status: 'pending',
            totalPrice: 100,
          },
        ],
      },
    });

    axios.put.mockResolvedValue({});

    render(
      <MemoryRouter>
        <BookingScreen />
      </MemoryRouter>
    );

 
    await waitFor(() => {
    
      jest.spyOn(window, 'toast').mockImplementation(() => {});

      
      fireEvent.click(screen.getByText(/Accept Booking/i));

      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:5005/bookings/accept/test-booking-id',
        {},
        expect.any(Object)
      );


      expect(window.toast).toHaveBeenCalledWith({ success: expect.any(Function) });
    });
  });


});