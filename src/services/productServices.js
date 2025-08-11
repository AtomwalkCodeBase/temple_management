import { AddupdateTemple, getTempleList } from "../services/ConstantServies";
import { authAxios, authAxiosFilePost, authAxiosPost } from "./HttpMethod";

export function addupdatetempale(tempale_data) {
  return authAxiosPost(AddupdateTemple, tempale_data);
}

export function gettemplist() {
  return authAxios(getTempleList);
}
