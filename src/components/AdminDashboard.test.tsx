import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from '../components/AdminDashboard'; // Ensure correct import path

describe('AdminDashboard Form', () => {
  test('renders event title input', () => {
    render(<AdminDashboard />);

    // Locate event title input by placeholder text
    const eventTitleInput = screen.getByPlaceholderText(/Enter event title/i);
    expect(eventTitleInput).toBeInTheDocument();

    // Simulate typing in the event title input field
    fireEvent.change(eventTitleInput, { target: { value: 'Sample Event' } });

    // Assert the value in the input field
    expect(eventTitleInput).toHaveValue('Sample Event');
  });
});