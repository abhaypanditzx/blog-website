 exports.signup =  async (req, res) => {
    const { name, username, password } = req.body;
    console.log('signup route hit')
    try {
const userExist =await  User.findOne({username});
   if(userExist) return res.status(400).json({ message: "Username already taken" });
        const hashed =  await bcrypt.hash(password,10);
        const newUser = new User({ name, username, password:hashed});
        await newUser.save()
        console.log('User saved successfully!', newUser);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error(err)
    }
}