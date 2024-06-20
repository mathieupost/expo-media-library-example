import * as MediaLibrary from "expo-media-library";
import { Button, View } from "react-native";

export default function Index() {
  const deleteLatestAsset = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        console.error("Permission not granted");
        return;
      }

      const assets = await MediaLibrary.getAssetsAsync({
        first: 1,
        sortBy: ["creationTime"],
      });
      if (assets.assets.length === 0) {
        console.error("No assets found");
        return;
      }

      const asset = assets.assets[0];
      const deleted = await MediaLibrary.deleteAssetsAsync([asset.id]);
      if (!deleted) {
        console.error("Failed to delete asset");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Delete latest asset" onPress={deleteLatestAsset} />
    </View>
  );
}
