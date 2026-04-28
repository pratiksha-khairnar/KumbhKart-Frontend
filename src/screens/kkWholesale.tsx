import React, { useState } from "react";
import {
  Alert, Platform,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View
} from "react-native";

// Form ka type define kiya taaki TS error na de
interface StoreForm {
  storeName: string;
  ownerName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pinCode: string;
  mobile: string;
  gstPan: string;
  registerAs: string;
  products: string[];
}

export default function StoreRegister() {
  const [form, setForm] = useState<StoreForm>({
    storeName: "",
    ownerName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pinCode: "",
    mobile: "",
    gstPan: "",
    registerAs: "",
    products: [],
  });

  const toggleProduct = (item: string) => {
    setForm((prev) => {
      const exists = prev.products.includes(item);
      return {
        ...prev,
        products: exists
          ? prev.products.filter((p) => p !== item)
          : [...prev.products, item],
      };
    });
  };

  const handleSubmit = () => {
    console.log(form);
    // Platform specific alert fix
    if (Platform.OS === 'web') {
      window.alert("Store Registered Successfully!");
    } else {
      Alert.alert("Success", "Store Registered Successfully!");
    }
  };

  // State update karne ka sabse sahi tarika
  const updateField = (field: keyof StoreForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>

      {/* NAVBAR */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Register Your Store Details
        </Text>
      </View>

      {/* FORM */}
      <ScrollView contentContainerStyle={styles.container}>

        <TextInput
          placeholder="Store Name *"
          style={styles.input}
          value={form.storeName}
          onChangeText={(t) => updateField("storeName", t)}
        />

        <TextInput
          placeholder="Owner Name *"
          style={styles.input}
          value={form.ownerName}
          onChangeText={(t) => updateField("ownerName", t)}
        />

        <TextInput
          placeholder="Address Line 1 *"
          style={styles.input}
          value={form.address1}
          onChangeText={(t) => updateField("address1", t)}
        />

        <TextInput
          placeholder="Address Line 2"
          style={styles.input}
          value={form.address2}
          onChangeText={(t) => updateField("address2", t)}
        />

        <TextInput
          placeholder="City *"
          style={styles.input}
          value={form.city}
          onChangeText={(t) => updateField("city", t)}
        />

        <TextInput
          placeholder="State *"
          style={styles.input}
          value={form.state}
          onChangeText={(t) => updateField("state", t)}
        />

        <TextInput
          placeholder="Pin Code *"
          keyboardType="numeric"
          style={styles.input}
          value={form.pinCode}
          onChangeText={(t) => updateField("pinCode", t)}
        />

        <TextInput
          placeholder="Mobile *"
          keyboardType="phone-pad"
          style={styles.input}
          value={form.mobile}
          onChangeText={(t) => updateField("mobile", t)}
        />

        <TextInput
          placeholder="GST / PAN *"
          style={styles.input}
          value={form.gstPan}
          onChangeText={(t) => updateField("gstPan", t)}
        />

        {/* PRODUCTS */}
        <Text style={styles.label}>Products Interested In</Text>

        {["PAPAD", "PUJA SAMAGRI", "HOMEMADE DESI SNACK", "READY 2 EAT"].map(
          (item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.checkbox,
                form.products.includes(item) && styles.checked,
              ]}
              onPress={() => toggleProduct(item)}
            >
              <Text style={{ color: form.products.includes(item) ? "#db1c07" : "#333" }}>
                {item}
              </Text>
            </TouchableOpacity>
          )
        )}

        {/* SUBMIT */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register Store</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#db1c07",
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
  },
  container: {
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "92%",
    alignSelf: "center",
  },
  label: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: "4%",
  },
  checkbox: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "92%",
    alignSelf: "center",
  },
  checked: {
    backgroundColor: "#ffe0cc",
    borderColor: "#db1c07",
  },
  button: {
    backgroundColor: "#db1c07",
    paddingVertical: 14,
    marginTop: 25,
    borderRadius: 10,
    width: "45%",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});