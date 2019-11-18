import axios from "axios";

export async function testMock(): Promise<{}> {
  return await axios.get("/users/", {headers: {foo: "bar"}});
}
