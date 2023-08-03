import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withRouter } from "../../tests/utils";
import { Route, useLocation } from "react-router-dom";
import CartsCard from "../CartsCard";
import {
  fakeProductInCarts,
  singleFakeProductInCarts,
} from "../../tests/products";

describe("CartsCard", () => {
  const onAddCount = {
    mutate: jest.fn(),
  };
  const onDeleteCount = {
    mutate: jest.fn(),
  };
  const onDeleteCarts = {
    mutate: jest.fn(),
  };

  afterEach(() => {
    onAddCount.mutate.mockReset();
    onDeleteCount.mutate.mockReset();
    onDeleteCarts.mutate.mockReset();
  });

  it("스냅샷 테스트", () => {
    const { asFragment } = renderCartsCard();
    expect(asFragment()).toMatchSnapshot();
  });

  it("장바구니에 담은 해당 아이템의 수가 정확해야한다.", () => {
    renderCartsCard();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("아이템 수 추가 버튼을 누르면 아이템의 수가 늘어나야한다.", async () => {
    renderCartsCard();
    const button = screen.getByRole("button", {
      name: "addCount",
    });
    await userEvent.click(button);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("아이템 수 삭제 버튼을 누르면 아이템의 수가 적어저야한다.", async () => {
    renderCartsCard();
    const addBtn = screen.getByRole("button", {
      name: "addCount",
    });
    const deleteBtn = screen.getByRole("button", {
      name: "deleteCount",
    });
    await userEvent.click(addBtn);
    await userEvent.click(deleteBtn);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("아이템 수 삭제 버튼을 계속 누르다가 아이템 수가 0이 되면 해당 CartsCard는 나타나지 말아야한다.", async () => {
    renderCartsCard();
    const button = screen.getByRole("button", {
      name: "deleteCount",
    });
    await userEvent.click(button);
    expect(screen.queryByRole("listitem")).toBeNull();
  });

  it("아이템이 삭제 되면 해당 CartsCard는 나타나지 말아야한다", async () => {
    renderCartsCard();
    const button = screen.getByRole("button", {
      name: "deleteCarts",
    });
    await userEvent.click(button);
    expect(screen.queryByRole("listitem")).toBeNull();
  });

  it("이미지를 클릭하면 해당 제품의 product detail로 이동해야한다", async () => {
    renderCartsCard();
    const img = screen.getByRole("img", {
      name: "go-to-product-detail",
    });
    await userEvent.click(img);
    expect(
      screen.getByText(JSON.stringify({ product: singleFakeProductInCarts }))
    ).toBeInTheDocument();
  });

  function renderCartsCard() {
    return render(
      withRouter(
        <>
          <Route
            element={
              <CartsCard
                id={1}
                productInCarts={singleFakeProductInCarts}
                onAddCount={onAddCount}
                onDeleteCarts={onDeleteCarts}
                onDeleteCount={onDeleteCount}
              />
            }
            path="/"
          />
          <Route element={<ProductDetail />} path="/products/1" />
        </>
      )
    );
  }

  function ProductDetail() {
    return <p>{JSON.stringify(useLocation().state)}</p>;
  }
});
