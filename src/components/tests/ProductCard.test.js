import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withRouter } from "../../tests/utils";
import { Route, useLocation } from "react-router-dom";
import ProductCard from "../ProductCard";
import { fakeProduct } from "../../tests/products";

describe("ProductCard", () => {
  it("스냅샷 테스트", () => {
    const { asFragment } = renderProductCard();
    expect(asFragment()).toMatchSnapshot();
  });

  it("올바른 제품 정보를 보여줘야한다", () => {
    renderProductCard();
    expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();
    expect(screen.getByText(fakeProduct.category)).toBeInTheDocument();
    expect(screen.getByText(`₩${fakeProduct.price}`)).toBeInTheDocument();
  });

  it("제품 카드를 클릭했을 때 제품 디테일로 이동함과 동시에 올바른 제품 카드 정보가 들어와야한다", async () => {
    renderProductCard();
    const card = screen.getByRole("listitem");
    await userEvent.click(card);

    expect(
      screen.getByText(JSON.stringify({ product: fakeProduct }))
    ).toBeInTheDocument();
  });

  function renderProductCard() {
    return render(
      withRouter(
        <>
          <Route
            element={<ProductCard id={1} product={fakeProduct} />}
            path="/"
          />
          <Route element={<ProductDetail />} path={"/products/1"} />
        </>
      )
    );
  }

  function ProductDetail() {
    return <p>{JSON.stringify(useLocation().state)}</p>;
  }
});
