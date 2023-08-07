import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  withAllUserContexts,
  withReactQuery,
  withRouter,
} from "../../tests/utils";
import { Route } from "react-router-dom";
import ProductDetail from "../ProductDetail";
import { fakeProduct } from "../../tests/products";

describe("ProductDetail", () => {
  const userRepository = {
    updateCartsOnce: jest.fn(),
  };

  afterEach(() => {
    userRepository.updateCartsOnce.mockReset();
  });

  it("스냅샷 테스트", () => {
    const { asFragment } = renderProductDetail(null);
    expect(asFragment()).toMatchSnapshot();
  });

  it("로그인하지 않은 상태면 장바구니 추가 버튼이 disabled 상태여야한다", () => {
    renderProductDetail(null);
    const button = screen.getByRole("button", {
      name: "장바구니에 추가",
    });
    expect(button).toBeDisabled();
  });

  it("로그인한 상태면 장바구니 추가 버튼이 abled 상태여야한다", () => {
    renderProductDetail("1");
    const button = screen.getByRole("button", {
      name: "장바구니에 추가",
    });
    expect(button).not.toBeDisabled();
  });

  it("장바구니에 아이템이 추가되면 '장바구니에 추가되었습니다'라는 메시지가 떠야한다", async () => {
    renderProductDetail("1");
    const button = screen.getByRole("button", {
      name: "장바구니에 추가",
    });
    await userEvent.click(button);
    await waitFor(() =>
      expect(
        screen.getByText("✔️ 장바구니에 추가되었습니다.")
      ).toBeInTheDocument()
    );
  });

  function renderProductDetail(uid) {
    return render(
      withAllUserContexts(
        withReactQuery(
          withRouter(<Route element={<ProductDetail />} path="/products/1" />, {
            pathname: "/products/1",
            state: { product: fakeProduct },
            key: "fake-key",
          })
        ),
        userRepository,
        {
          uid,
          logUserIn: () => {},
        }
      )
    );
  }
});
