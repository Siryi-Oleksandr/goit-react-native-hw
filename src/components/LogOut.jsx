import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { pallete } from "../helpers/variables";

export function LogOut() {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        marginRight: 16,
      }}
      onPress={() => alert("Log out from your acount NEW")}
    >
      <Icon name="sign-out" size={24} color={pallete.gray} />
    </TouchableOpacity>
  );
}
