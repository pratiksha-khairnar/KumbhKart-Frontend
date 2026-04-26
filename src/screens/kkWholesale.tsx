import React, { useState } from "react";
import {
  View, Text, TextInput, StyleSheet,
  ScrollView, TouchableOpacity
} from "react-native";

export default function StoreRegister() {
  const [form, setForm] = useState({
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

  const toggleProduct = (item) => {
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
    alert("Store Registered Successfully!");
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
          onChangeText={(t) => setForm({ ...form, storeName: t })}
        />

        <TextInput
          placeholder="Owner Name *"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, ownerName: t })}
        />

        <TextInput
          placeholder="Address Line 1 *"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, address1: t })}
        />

        <TextInput
          placeholder="Address Line 2"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, address2: t })}
        />

        <TextInput
          placeholder="City *"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, city: t })}
        />

        <TextInput
          placeholder="State *"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, state: t })}
        />

        <TextInput
          placeholder="Pin Code *"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, pinCode: t })}
        />

        <TextInput
          placeholder="Mobile *"
          keyboardType="phone-pad"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, mobile: t })}
        />

        <TextInput
          placeholder="GST / PAN *"
          style={styles.input}
          onChangeText={(t) => setForm({ ...form, gstPan: t })}
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
              <Text>{item}</Text>
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
  backgroundColor: "#F36D00",
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

  // 👉 NEW FIX (left-right space kam)
  width: "92%",
  alignSelf: "center",
},

  label: {
  marginTop: 10,
  marginBottom: 10,
  fontWeight: "bold",
  alignSelf: "flex-start", // 👉 left align text
  marginLeft: "4%",
},
  checkbox: {
  backgroundColor: "white",
  padding: 10,
  marginBottom: 8,
  borderRadius: 6,
  borderWidth: 1,
  borderColor: "#ddd",

  // 👉 same width control as inputs
  width: "92%",
  alignSelf: "center",
},

  checked: {
  backgroundColor: "#ffe0cc",
  borderColor: "#F36D00",
},

  button: {
  backgroundColor: "#F36D00",
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