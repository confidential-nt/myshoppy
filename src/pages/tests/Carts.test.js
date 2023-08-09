import { render, screen, waitFor } from "@testing-library/react";
import {
  withAllUserContexts,
  withReactQuery,
  withRouter,
} from "../../tests/utils";
import { Route } from "react-router-dom";
import Carts from "../Carts";
import { fakeProducts } from "../../tests/products";
import { fakeAdminUser } from "../../tests/user";
import * as TotalPrice from "../../components/TotalPrice";

jest.mock("../../components/TotalPrice");

describe("Carts", () => {
  const mockTotalPriceProp = jest.fn();

  TotalPrice.default = function MockTotalPrice({ productInCarts }) {
    mockTotalPriceProp(productInCarts);
    const products = Object.entries(productInCarts).map(([k, v]) => v);
    const totalPrice = products.reduce((acc, cur) => {
      return cur.count * cur.price + acc;
    }, 0);
    const deliveryFee = 3000;
    return (
      <div className="flex flex-col items-center">
        <span>총가격</span>
        <strong className="text-shoppypink">₩{totalPrice + deliveryFee}</strong>
      </div>
    );
  };

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
    mockTotalPriceProp.mockReset();
    jest.clearAllMocks();
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

  it("TotalPrice는 올바른 productsInCarts를 받아야 한다", async () => {
    productRepository.findAll.mockImplementation(() =>
      Promise.resolve(fakeProducts)
    );
    userRepository.findById.mockImplementation(() =>
      Promise.resolve(fakeAdminUser)
    );
    renderCarts();
    await screen.findAllByRole("listitem");
    expect(mockTotalPriceProp).toHaveBeenCalledWith(
      expect.objectContaining({
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
      })
    );
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
