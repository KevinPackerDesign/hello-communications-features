import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  state = {
    image: null,
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
      }).catch((error) => console.log(error));

      if (!result.cancelled) {
        this.setState({ image: result });
      }
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Pick an image from the library" onPress={this.pickImage} />
      <Button title="Take a photo" onPress={this.takePhoto} />
      {this.state.image && (
        <Image
          source={{ uri: this.state.image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
