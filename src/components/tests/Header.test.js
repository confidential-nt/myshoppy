import { render, screen } from "@testing-library/react";
import {
  withAllUserContexts,
  withAuthContext,
  withRouter,
} from "../../tests/utils";
import Header from "../Header";
import { Route } from "react-router-dom";
import { fakeAdminUser } from "../../tests/user";

describe("Header", () => {
  const userRepository = {
    insert: jest.fn(),
    findById: jest.fn(),
    onUpdateCarts: jest.fn(),
  };
  const auth = {
    login: jest.fn(),
    logout: jest.fn(),
    onStateChage: jest.fn(),
  };

  afterEach(() => {
    userRepository.insert.mockReset();
    auth.login.mockReset();
    auth.logout.mockReset();
    auth.onStateChage.mockReset();
  });

  it("스냅샷 테스트", () => {
    userRepository.findById.mockImplementation(() => Promise.resolve(null));
    const { asFragment } = renderHeader(null);
    expect(asFragment()).toMatchSnapshot();
  });

  it("uid가 존재하면 login 버튼은 없고 logout 버튼만 있어야한다", () => {
    userRepository.findById.mockImplementation(() =>
      Promise.resolve(fakeAdminUser)
    );
    renderHeader("1");
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.queryByText("Login")).toBeNull();
  });

  it("uid가 없으면 login 버튼은 있고 logout 버튼은 없어야한다", () => {
    userRepository.findById.mockImplementation(() => Promise.resolve(null));
    renderHeader(null);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Logout")).toBeNull();
  });

  function renderHeader(uid) {
    return render(
      withAuthContext(
        withAllUserContexts(
          withRouter(<Route element={<Header />} path="/" />),
          userRepository,
          {
            uid,
            logUserIn: () => {},
          }
        )
      )
    );
  }
});
