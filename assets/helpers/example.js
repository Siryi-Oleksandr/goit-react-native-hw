const App = () => {
  const [orientation, setOrientation] = useState("portrait");

  const getOrientation = () => {
    const { width, height } = Dimensions.get("window");
    if (width > height) {
      setOrientation("landscape");
    } else {
      setOrientation("portrait");
    }
  };

  useEffect(() => {
    getOrientation();
    Dimensions.addEventListener("change", getOrientation);
    return () => {
      Dimensions.removeEventListener("change", getOrientation);
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        orientation === "landscape" && styles.landscape,
      ]}
    >
      <Text style={styles.text}>Orientation: {orientation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  landscape: {
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
