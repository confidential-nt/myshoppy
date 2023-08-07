import { render, screen, waitFor } from "@testing-library/react";
import Products from "../Products";
import { withReactQuery, withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";
import { fakeProducts } from "../../tests/products";

describe("Products", () => {
  const fakeProductRepository = {
    findAll: jest.fn(),
  };

  afterEach(() => fakeProductRepository.findAll.mockReset());

  it("스냅샷 테스트", async () => {
    fakeProductRepository.findAll.mockImplementation(() => fakeProducts);

    const { asFragment } = renderProducts();
    await screen.findAllByRole("listitem");
    expect(asFragment()).toMatchSnapshot();
  });

  it("로딩 중이면 로딩 표시가 떠야한다", () => {
    fakeProductRepository.findAll.mockImplementation(() => fakeProducts);
    renderProducts();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("에러가 나면 에러가 났다는 표시가 떠야한다", async () => {
    fakeProductRepository.findAll.mockImplementation(() => {
      throw new Error();
    });
    renderProducts();
    await waitFor(() => {
      expect(screen.getByText("Something is wrong 😖")).toBeInTheDocument();
    });
  });

  it("products가 없으면 그 어떤 product card도 생성되지 말아야한다.", async () => {
    fakeProductRepository.findAll.mockImplementation(() => null);
    renderProducts();
    await waitFor(() => {
      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    });
  });

  it("product 목록이 올바르게 렌더되어야한다", async () => {
    fakeProductRepository.findAll.mockImplementation(() => fakeProducts);
    renderProducts();
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(
        Object.keys(fakeProducts).length
      );
    });
  });

  function renderProducts() {
    return render(
      withReactQuery(
        withRouter(
          <Route
            element={<Products productRepository={fakeProductRepository} />}
            path="/"
          />
        )
      )
    );
  }
});
