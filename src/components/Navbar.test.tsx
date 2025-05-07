// src/_tests_/Navbar.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { useUser } from '@clerk/clerk-react';

// Mock useUser from Clerk
jest.mock('@clerk/clerk-react', () => ({
  useUser: jest.fn(),
  SignInButton: ({ children }: any) => <div data-testid="sign-in-button">{children}</div>,
  UserButton: () => <div data-testid="user-button">User Button</div>,
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders navigation links', () => {
    (useUser as jest.Mock).mockReturnValue({ isSignedIn: false, user: null });

    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('renders sign in button when not signed in', () => {
    (useUser as jest.Mock).mockReturnValue({ isSignedIn: false, user: null });

    render(<Navbar />);
    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('renders user greeting when signed in', () => {
    (useUser as jest.Mock).mockReturnValue({
      isSignedIn: true,
      user: { firstName: 'Alice' },
    });

    render(<Navbar />);
    expect(screen.getByText(/Welcome, Alice/i)).toBeInTheDocument();
  });

  test('renders notification bell when signed in', () => {
    (useUser as jest.Mock).mockReturnValue({
      isSignedIn: true,
      user: { firstName: 'Test' },
    });

    render(<Navbar />);
    expect(screen.getByText('3')).toBeInTheDocument(); // Notification count
  });

  test('renders user button when signed in', () => {
    (useUser as jest.Mock).mockReturnValue({
      isSignedIn: true,
      user: { firstName: 'Test' },
    });

    render(<Navbar />);
    expect(screen.getByTestId('user-button')).toBeInTheDocument();
  });
});
