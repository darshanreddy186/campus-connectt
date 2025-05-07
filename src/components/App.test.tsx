import { render, screen, waitFor } from "@testing-library/react";
import App from "../App"; // Correct relative import from _tests_ folder

// Mock @clerk/clerk-react
jest.mock("@clerk/clerk-react", () => ({
  SignedIn: ({ children }) => <>{children}</>,
  SignedOut: () => <div data-testid="signed-out">Signed Out</div>,
  RedirectToSignIn: () => (
    <div data-testid="redirect">Redirecting to Sign In</div>
  ),
  useUser: jest.fn(() => ({
    isLoaded: true,
    user: {
      id: "user_123",
      publicMetadata: { role: "student" }, // Default to student
    },
  })),
}));

// Mock components to isolate App logic
jest.mock("../components/Navbar", () => () => (
  <div data-testid="navbar">Mock Navbar</div>
));
jest.mock("../components/AdminDashboard", () => ({ onEventAdded }) => (
  <div data-testid="admin-dashboard">Mock Admin Dashboard</div>
));
jest.mock(
  "../components/EventCard",
  () =>
    ({ event, onRegister, isRegistered }) =>
      <div data-testid="event-card">{event.title}</div>
);

// Mock fetch for event data
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            _id: "1",
            title: "Mock Event",
            date: "2025-01-01",
            category: "Tech",
            image: "",
            description: "Test Description",
            location: "Campus Hall",
            registeredUsers: ["user_123"],
          },
        ]),
    })
  ) as jest.Mock;
});

describe("<App />", () => {
  it("renders student view with events and FeatureCards", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId("event-card")).toBeInTheDocument()
    );

    expect(
      screen.getByText(/Welcome to Campus Connector/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Mock Event/i)).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders admin dashboard if user is admin", async () => {
    (require("@clerk/clerk-react").useUser as jest.Mock).mockReturnValue({
      isLoaded: true,
      user: {
        id: "admin_123",
        publicMetadata: { role: "admin" },
      },
    });

    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId("admin-dashboard")).toBeInTheDocument()
    );
  });

  it("shows loading screen when user is not yet loaded", () => {
    (require("@clerk/clerk-react").useUser as jest.Mock).mockReturnValue({
      isLoaded: false,
      user: null,
    });

    render(<App />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("shows signed-out screen when user is signed out", () => {
    (require("@clerk/clerk-react").useUser as jest.Mock).mockReturnValue({
      isLoaded: true,
      user: null,
    });

    render(<App />);
    expect(screen.getByTestId("signed-out")).toBeInTheDocument();
  });
 
    
  // it("handles event registration for logged-in user", async () => {
  //   render(<App />);
  //   await waitFor(() => screen.getByText(/Mock Event/i));
  //   const registerButton = screen.getByText("Mock Event");
  //   expect(registerButton).toBeInTheDocument();

  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       ok: true,
  //     })
  //   );

  //   registerButton.click();
  //   await waitFor(() =>
  //     expect(global.fetch).toHaveBeenCalledWith(
  //       "http://localhost:5000/api/events/1/register",
  //       expect.objectContaining({
  //         method: "POST",
  //       })
  //     )
  //   );
  // });
});
