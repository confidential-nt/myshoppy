import { render, waitFor, screen } from "@testing-library/react";
import { withAllUserContexts, withRouter } from "../../tests/utils";
import PencilIcon from "../PencilIcon";
import { Route } from "react-router-dom";
import { fakeAdminUser, fakeNotAdminUser } from "../../tests/user";

describe("PencilIcon", () => {
  const userRepository = {
    findById: jest.fn(),
  };

  afterEach(() => userRepository.findById.mockReset());

  it("스냅샷 테스트(유저=어드민)", async () => {
    userRepository.findById.mockImplementation(() =>
      Promise.resolve(fakeAdminUser)
    );

    const { asFragment } = renderPencilIcon();
    await screen.findByRole("link");
    expect(asFragment()).toMatchSnapshot();
  });

  it("렌더될 때 올바른 유저의 정보를 가져와야한다", () => {
    userRepository.findById.mockImplementation(() =>
      Promise.resolve(fakeAdminUser)
    );
    renderPencilIcon();
    expect(userRepository.findById).toHaveBeenCalledWith("1");
  });

  it("유저가 어드민이 아니라면 아무것도 렌더되지 말아야한다.", async () => {
    userRepository.findById.mockImplementation(() =>
      Promise.resolve(fakeNotAdminUser)
    );
    renderPencilIcon();
    await waitFor(() => expect(screen.queryByRole("link")).toBeNull());
  });

  function renderPencilIcon() {
    return render(
      withAllUserContexts(
        withRouter(<Route element={<PencilIcon />} path="/" />),
        userRepository,
        {
          uid: "1",
          logUserIn: () => {},
        }
      )
    );
  }
});
