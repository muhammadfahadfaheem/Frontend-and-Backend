// Express package ko import kar rahe hain
const express = require("express");
// Express application create kar rahe hain
const app = express();
// Server kis port par chalega
const PORT = 3000;
// Middleware
// Incoming JSON data ko read karne ke liye
app.use(express.json());
// Temporary array
// Isme users ka data temporarily store hoga
// Server restart hoga to sara data delete ho jayega
const users = [];
// ==========================
// Registration API (POST)
// ==========================
app.post("/register", (req, res) => {
    // Request body se data receive kar rahe hain
    const { name, email, password } = req.body;
    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    // Duplicate Email Check
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }
    // Naya user object create kar rahe hain
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };
    // User ko array me save kar rahe hain
    users.push(newUser);
    // Success response
    res.status(201).json({
        message: "Registration Successful",
        user: newUser
    });
});
// ==========================
// Get All Users API (GET)
// ==========================
app.get("/users", (req, res) => {
    // Tamam users return kar rahe hain
    res.status(200).json(users);
});
// ==========================
// Get Single User By ID (GET)
// ==========================
app.get("/users/:id", (req, res) => {
    // URL se ID receive kar rahe hain
    const id = Number(req.params.id);
    // User ko ID se find kar rahe hain
    const user = users.find(user => user.id === id);
    // Agar user exist nahi karta
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    // Single user return kar rahe hain
    res.status(200).json({
        message: "User Found Successfully",
        user: user
    });
});
// ==========================
// Update User API (PUT)
// ==========================
app.put("/users/:id", (req, res) => {
    // URL se ID receive kar rahe hain
    const id = Number(req.params.id);
    // Request body se updated data receive kar rahe hain
    const { name, email, password } = req.body;
    // User ko ID se find kar rahe hain
    const user = users.find(user => user.id === id);
    // Agar user exist nahi karta
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    // Duplicate email check
    const existingUser = users.find(
        user => user.email === email && user.id !== id
    );
    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }
    // User information update kar rahe hain
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    // Success response
    res.status(200).json({
        message: "User Updated Successfully",
        user: user
    });
});
// ==========================
// Delete User API (DELETE)
// ==========================
app.delete("/users/:id", (req, res) => {
    // URL se ID receive kar rahe hain
    const id = Number(req.params.id);
    // User ka index find kar rahe hain
    const userIndex = users.findIndex(user => user.id === id);
    // Agar user exist nahi karta
    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    // User ko array se delete kar rahe hain
    const deletedUser = users.splice(userIndex, 1);
    // Success response
    res.status(200).json({
        message: "User Deleted Successfully",
        user: deletedUser[0]
    });
});
// ==========================
// Start Server
// ==========================
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});