import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withAllUserContexts, withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";
import AddProduct from "../AddProduct";

describe("AddProduct", () => {
  const imageUploader = {
    upload: jest.fn(),
  };
  const productRepository = {
    insert: jest.fn(),
  };

  afterEach(() => {
    imageUploader.upload.mockReset();
    productRepository.insert.mockReset();
  });

  it("스냅샷 테스트", () => {
    const { asFragment } = renderAddProduct();
    expect(asFragment()).toMatchSnapshot();
  });

  it("제품 사진을 등록하면 제품 이미지가 나타나야한다", async () => {
    imageUploader.upload.mockImplementation(() => Promise.resolve("hello.png"));
    renderAddProduct();
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    const input = screen.getByLabelText("Upload file:");
    await userEvent.upload(input, file);
    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  it("제품을 등록하면 업로딩 중이라는 표시가 나타나야한다", async () => {
    productRepository.insert.mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => resolve(null), 1000);
        })
    );

    renderAddProduct();
    const button = screen.getByRole("button", {
      name: "제품 등록하기",
    });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Uploading....")).toBeInTheDocument();
    });
  });

  it("제품 업로딩이 완료되면 완료되었다는 표시가 나타나야한다", async () => {
    productRepository.insert.mockImplementation(() => Promise.resolve(null));
    renderAddProduct();
    const button = screen.getByRole("button", {
      name: "제품 등록하기",
    });
    await userEvent.click(button);
    await waitFor(() => {
      expect(
        screen.getByText("✔ 성공적으로 제품이 추가되었습니다.")
      ).toBeInTheDocument();
    });
  });

  function renderAddProduct() {
    return render(
      withAllUserContexts(
        withRouter(
          <Route
            path="/"
            element={
              <AddProduct
                imageUploader={imageUploader}
                productRepository={productRepository}
              />
            }
          />
        ),
        null,
        {
          uid: "1",
          logUserIn: () => {},
        }
      )
    );
  }
});
