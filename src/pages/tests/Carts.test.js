import { render, screen, waitFor } from "@testing-library/react";
import {
  withAllUserContexts,
  withReactQuery,
  withRouter,
} from "../../tests/utils";
import { Route } from "react-router-dom";
import Carts, { productsInCarts } from "../Carts";
import { fakeProducts } from "../../tests/products";
import { fakeAdminUser } from "../../tests/user";

describe("Carts", () => {
  const productRepository = {
    findAll: jest.fn(),
  };
  const userRepository = {
    updateCount: jest.fn(),
    deleteCarts: jest.fn(),
    findById: jest.fn(),
  };

  afterEach(() => {
    productRepository.findAll.mockReset();
    userRepository.deleteCarts.mockReset();
    userRepository.findById.mockReset();
    userRepository.updateCount.mockReset();
  });

  it("스냅샷 테스트", async () => {
    productRepository.findAll.mockImplementation(() =>
      Promise.resolve(fakeProducts)
    );
    userRepository.findById.mockImplementation(() =>
      Promise.resolve(fakeAdminUser)
    );

    const { asFragment } = renderCarts();
    await screen.findAllByRole("listitem");
    expect(asFragment()).toMatchSnapshot();
  });

  it("로딩 중이라면 로딩 표시를 해야하며 TotalPrice는 표시되지 말아야한다", () => {
    productRepository.findAll.mockImplementation(() =>
      Promise.resolve(fakeProducts)
    );
    userRepository.findById.mockImplementation(() =>
      Promise.resolve(fakeAdminUser)
    );

    renderCarts();
    expect(screen.getByText("is loading...")).toBeInTheDocument();
    expect(screen.queryByText("총가격")).toBeNull();
  });

  it("에러가 났다면 에러가 났다는 표시를 해야하며 TotalPrice는 표시되지 말아야한다", async () => {
    productRepository.findAll.mockImplementation(() => {
      throw new Error();
    });
    userRepository.findById.mockImplementation(() => {
      throw new Error();
    });
    renderCarts();
    await waitFor(() => {
      expect(screen.getByText("Something is wrong")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("총가격")).toBeNull();
    });
  });

  it("productInCarts가 없다면 CartsCard, TotalPrice는 표시되지 말아야한다", async () => {
    productRepository.findAll.mockImplementation(() => {
      return Promise.resolve(null);
    });
    userRepository.findById.mockImplementation(() =>
      Promise.resolve(fakeAdminUser)
    );
    await waitFor(() => {
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
    await waitFor(() => {
      expect(screen.queryByText("총가격")).toBeNull();
    });
  });

  it("올바른 productsInCarts를 계산해야한다", async () => {
    productRepository.findAll.mockImplementation(() =>
      Promise.resolve(fakeProducts)
    );
    userRepository.findById.mockImplementation(() =>
      Promise.resolve(fakeAdminUser)
    );
    const result = await productsInCarts(
      "1",
      userRepository,
      productRepository
    );
    expect(result).toStrictEqual({
      1: {
        category: "여성",
        desc: "스타일리쉬한 핑크색이 돋보이는 핫핑크색 후드",
        imageURL: "http://image/",
        name: "핫핑크 후드 HOODY",
        options: "xs,s,m,l,xl",
        price: "40000",
        uid: "abcd",
        count: 1,
        option: "s",
      },
    });
  });

  function renderCarts() {
    return render(
      withAllUserContexts(
        withReactQuery(
          withRouter(
            <Route
              path="/"
              element={<Carts productRepository={productRepository} />}
            />
          )
        ),
        userRepository,
        {
          uid: "1",
          logUserIn: () => {},
        }
      )
    );
  }
});
