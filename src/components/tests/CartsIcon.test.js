import { render, screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";
import { withAllUserContexts, withRouter } from "../../tests/utils";
import CartsIcon from "../CartsIcon";
import { fakeAdminUser } from "../../tests/user";

describe("CartsIcon", () => {
  const userRepository = {
    findById: jest.fn(),
    onUpdateCarts: jest.fn(),
  };

  afterEach(() => {
    userRepository.findById.mockReset();
  });

  it("스냅샷 테스트(uid O)", async () => {
    userRepository.findById.mockImplementation(() =>
      Promise.resolve(fakeAdminUser)
    );

    const { asFragment } = renderCartsIcon("1");
    await screen.findByText(fakeAdminUser.carts[1].count);
    expect(asFragment()).toMatchSnapshot();
  });

  it("uid가 없으면 숫자는 표시되지 말아야한다", async () => {
    userRepository.findById.mockImplementation(() => null);
    renderCartsIcon();
    await waitFor(() => {
      expect(screen.queryByText(fakeAdminUser.carts[1].count)).toBeNull();
    });
  });

  it("렌더될 때 올바른 유저의 정보를 가져와야한다", () => {
    userRepository.findById.mockImplementation(() =>
      Promise.resolve(fakeAdminUser)
    );
    renderCartsIcon("1");
    expect(userRepository.findById).toHaveBeenCalledWith("1");
  });

  function renderCartsIcon(uid) {
    return render(
      withAllUserContexts(
        withRouter(<Route element={<CartsIcon />} path="/" />),
        userRepository,
        {
          uid: !uid ? null : uid,
          logUserIn: () => {},
        }
      )
    );
  }
});
