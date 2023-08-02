import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import TotalPrice from "../TotalPrice";
import { fakeProductInCarts } from "../../tests/products";

describe("TotalPrice", () => {
  it("스냅샷 테스트", () => {
    const component = renderer.create(
      <TotalPrice productInCarts={fakeProductInCarts} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("상품총액을 정확하게 계산해야한다", () => {
    render(<TotalPrice productInCarts={fakeProductInCarts} />);
    expect(screen.getByText("₩120000")).toBeInTheDocument();
  });

  it("총 가격을 정확하게 계산해야한다.", () => {
    render(<TotalPrice productInCarts={fakeProductInCarts} />);
    expect(screen.getByText("₩123000")).toBeInTheDocument();
  });
});
