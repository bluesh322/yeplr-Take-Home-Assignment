import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../App";
import YeplrApi from "../Api";

jest.mock("../Api");

const token = "test";

const testAdmin = {
  username: "test",
  password: "test",
};

const testUserActive = {
  id: 1,
  firstName: "test",
  lastName: "test",
  email: "t@t.com",
  state: "active",
};
const testUserPending = {
  id: 2,
  firstName: "test",
  lastName: "test",
  email: "t@t.com",
  state: "pending",
};

beforeEach(async () => {
  await YeplrApi.adminLogin.mockResolvedValue(token);
  await YeplrApi.getUsers.mockResolvedValue([testUserActive, testUserPending]);
  await YeplrApi.getUserById.mockResolvedValue(testUserActive);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("logged out views", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays homepage", async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(getByText("Yeplr")).toBeInTheDocument();
  });

  it("redirects to protected route if not logged in", async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/users"]}>
        <App />
      </MemoryRouter>
    );

    expect(getByText("Yeplr")).toBeInTheDocument();
  });

  it("displays register form when register button is clicked", async () => {
    const { getAllByText, getByLabelText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(getAllByText("Register A New User")[0]);
    });

    expect(getByLabelText("password")).toBeInTheDocument();
  });
});

describe("logged in views", () => {
  it("let a user log in ", async () => {
    const { getAllByText, getByLabelText, findByText, getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(getAllByText("Admin Login")[0]);
    });

    expect(getByLabelText("username")).toBeInTheDocument();

    fireEvent.input(getByLabelText("username"), {
      target: { value: "test" },
    });

    fireEvent.input(getByLabelText("password"), {
      target: { value: "test" },
    });

    fireEvent.submit(getByTestId("submit"));
    expect(
      await findByText("Register a user or view the user list")
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getAllByText("Log Out")[0]);
    });
  });

  it("let a user log in and view /users", async () => {
    const {
      getByText,
      getAllByText,
      getByLabelText,
      findByText,
      getByTestId,
    } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(getAllByText("Login")[0]);
    });

    expect(getByLabelText("username")).toBeInTheDocument();

    fireEvent.input(getByLabelText("username"), {
      target: { value: "test" },
    });

    fireEvent.input(getByLabelText("password"), {
      target: { value: "test" },
    });

    fireEvent.submit(getByTestId("submit"));
    expect(await findByText("Welcome Back testuser")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByText("View User List"));
    });

    let user = await findByText("Kyle");
    expect(user).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(user);
    });
    expect(await findByText("active")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getAllByText("Go Back")[0]);
      fireEvent.click(getAllByText("Log Out")[0]);
    });
  });

  it("let a user log in and log out", async () => {
    const {
      queryByText,
      getAllByText,
      getByLabelText,
      findByText,
      getByTestId,
    } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(getAllByText("Admin Login")[0]);
    });

    expect(getByLabelText("username")).toBeInTheDocument();

    fireEvent.input(getByLabelText("username"), {
      target: { value: "test" },
    });

    fireEvent.input(getByLabelText("password"), {
      target: { value: "test" },
    });

    fireEvent.submit(getByTestId("submit"));
    expect(await findByText("Register a user or view the user list")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getAllByText("Log Out")[0]);
    });

    expect(await queryByText("Register a user or view the user list")).not.toBeInTheDocument();
  });
});
