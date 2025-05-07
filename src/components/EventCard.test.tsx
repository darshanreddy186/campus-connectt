import { render, screen, fireEvent } from '@testing-library/react';
import EventCard from '../components/EventCard'; // Adjust based on your file structure

const mockEvent = {
  _id: '1',
  title: 'Sample Event',
  date: '2025-12-25',
  category: 'Workshop',
  image: 'https://via.placeholder.com/150',
  description: 'This is a sample event description.',
  location: 'Online',
};

describe('EventCard Component', () => {
  test('renders event title and description correctly', () => {
    render(<EventCard event={mockEvent} onRegister={jest.fn()} isRegistered={false} />);

    // Check if event title is rendered
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();

    // Check if event description is rendered
    expect(screen.getByText(mockEvent.description)).toBeInTheDocument();
  });

  test('renders event date and location correctly', () => {
    render(<EventCard event={mockEvent} onRegister={jest.fn()} isRegistered={false} />);

    // Check if event date is rendered
    expect(screen.getByText(mockEvent.date)).toBeInTheDocument();

    // Check if event location is rendered
    expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
  });

  test('Register Now button is enabled when user is not registered', () => {
    render(<EventCard event={mockEvent} onRegister={jest.fn()} isRegistered={false} />);

    // Get the "Register Now" button
    const registerButton = screen.getByRole('button', { name: /Register Now/i });

    // Check if the button is enabled
    expect(registerButton).not.toBeDisabled();
  });

  test('Register Now button is disabled and shows "✔ Registered" when user is registered', () => {
    render(<EventCard event={mockEvent} onRegister={jest.fn()} isRegistered={true} />);

    // Get the "Register Now" button
    const registerButton = screen.getByRole('button', { name: /✔ Registered/i });

    // Check if the button is disabled
    expect(registerButton).toBeDisabled();
  });

  test('calls onRegister when "Register Now" button is clicked', () => {
    const onRegisterMock = jest.fn();
    render(<EventCard event={mockEvent} onRegister={onRegisterMock} isRegistered={false} />);

    // Get the "Register Now" button
    const registerButton = screen.getByRole('button', { name: /Register Now/i });

    // Simulate click event
    fireEvent.click(registerButton);

    // Check if the onRegister function was called
    expect(onRegisterMock).toHaveBeenCalledTimes(1);
  });
});
