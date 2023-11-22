const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    return res.status(200).json({ message: "Registration successful!", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.userId = user._id;
            return res.status(200).json('Login successful!');
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.logout =  async (req,res) =>{
    try {
        req.session.destroy((err) => {
            if (err) throw err;
            res.send('Logged out successfully!');
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}
