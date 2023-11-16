// // This file can be deleted if you'd like
// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { MemoryRouter } from 'react-router-dom';

// import { ToastContainer } from 'react-toastify';
// import LoginScreen from './components/login/LoginScreen';
// import { login } from './features/auth/authSlice'
// import RegisterScreen from './components/register/RegisterScreen';
// import { register } from './features/auth/authSlice';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/o/i); // random letter
//   expect(linkElement).toBeInTheDocument();
// });



// const store = configureStore();

// test('renders LoginScreen component', () => {
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <ToastContainer />
//         <LoginScreen />
//       </MemoryRouter>
//     </Provider>
//   );
  
//   expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
//   expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
//   expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
//   expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
// });

// test('triggers login action when form is submitted', async () => {
//   // Render the component
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <ToastContainer />
//         <LoginScreen />
//       </MemoryRouter>
//     </Provider>
//   );

//   // Fill out the form
//   fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
//   fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

//   // Mock the login action
//   const loginAction = jest.spyOn(login, 'mutate');
  
//   // Submit the form
//   fireEvent.submit(screen.getByRole('button', { name: /Sign in/i }));

//   // Wait for the login action to be called
//   await waitFor(() => expect(loginAction).toHaveBeenCalledWith({
//     email: 'johndoe@gmail.com',
//     password: 'password123',
//   }));
//   loginAction.mockClear();
// });

// test('renders RegisterScreen component', () => {
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <ToastContainer />
//         <RegisterScreen />
//       </MemoryRouter>
//     </Provider>
//   );

//   expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
//   expect(screen.getByRole('button', { name: /Sign up/i })).toBeInTheDocument();
// });

// test('triggers register action when form is submitted', async () => {
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <ToastContainer />
//         <RegisterScreen />
//       </MemoryRouter>
//     </Provider>
//   );

//   // Mock the register action
//   const registerAction = jest.spyOn(register, 'mutate');
  
//   // Fill out the form
//   fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
//   fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
//   fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

//   // Submit the form
//   fireEvent.submit(screen.getByRole('button', { name: /Sign up/i }));

//   // Wait for the register action to be called
//   await waitFor(() => expect(registerAction).toHaveBeenCalledWith({
//     name: 'John Doe',
//     email: 'test@example.com',
//     password: 'password123',
//   }));
//   registerAction.mockClear();
// });
