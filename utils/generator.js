import AsyncStorage from "@react-native-async-storage/async-storage";

const loadData = async () => {
  const items = JSON.parse((await AsyncStorage.getItem("@items")) || "[]");
  const refactored = items.map((item) => {
    return {
      id: item.name,
      ...item,
    };
  });
  return refactored;
};

export async function generate() {
  const data = await loadData();

  // random bottom
  const bottoms = data.filter((item) => item.type === "Bottom");
  const bottom = bottoms[Math.floor(Math.random() * bottoms.length)];

  // random top
  const tops = data.filter((item) => item.type === "Top");
  const top = tops[Math.floor(Math.random() * tops.length)];

  // random headwear
  const headwears = data.filter((item) => item.type === "Headwear");
  const headwear =
    headwears[Math.floor(Math.random() * headwears.length)];

  return bottom || headwear || top
    ? { id: Math.floor(Math.random() * Date.now()).toString(), bottom, headwear, top }
    : undefined;
}
