import mockAxios from "axios";
import { testMock } from "./testMock";

it("should be tested", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve({
    data: {
      name: "foo",
    },
  }));
  expect((await testMock() as any).data.name).toEqual("foo");
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith("/users/", {headers: {foo: "bar"}});
});
