import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { pallete } from "../helpers/variables";

export function CustomGoBack({ goBack }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        marginLeft: 16,
      }}
      onPress={() => goBack()}
    >
      <Icon name="long-arrow-left" size={24} color={pallete.softBlack} />
    </TouchableOpacity>
  );
}
