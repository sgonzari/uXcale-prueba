import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { useFetch } from "./util-hooks/useFetch";

jest.mock("./util-hooks/useFetch", () => ({
  useFetch: jest.fn(),
}));

describe("App Component", () => {
  const mockGetMeetups = jest.fn();
  const mockCreateMeetup = jest.fn();
  const mockUpdateMeetup = jest.fn();

  beforeEach(() => {
    useFetch.mockReturnValue({
      data: [
        { id: "1", favourite: true },
        { id: "2", favourite: false },
      ],
      getMeetups: mockGetMeetups,
      createMeetup: mockCreateMeetup,
      updateMeetup: mockUpdateMeetup,
    });
  });

  test("renders the App component correctly", async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByTestId("app")).toBeInTheDocument();

    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(screen.getByText(1)).toBeInTheDocument();
  });

  test("fetches and displays favorites from useFetch", async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    await waitFor(() => {
      expect(useFetch).toHaveBeenCalled();
    });

    expect(screen.getByText(1)).toBeInTheDocument();
  });

  test("renders the App component correctly without data", async () => {
    useFetch.mockReturnValue({
      data: null,
      getMeetups: mockGetMeetups,
      createMeetup: mockCreateMeetup,
      updateMeetup: mockUpdateMeetup,
    });

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByTestId("app")).toBeInTheDocument();

    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(screen.getByText(0)).toBeInTheDocument();
  });
});
