const getToken = (req, res) => {
	if (req.user?.token) {
	let token = req.user.token
				req.logout();

	//	res.redirect(process.env.CLIENT_URL+'google/signin/'+token)
				res.status(200).json({
					error: false,
					message: "Successfully Loged In",
					token: token,
				});
			} else {
			
				res.status(403).json({ error: true, message: "Not Authorized" });
			}	
			
}

const failedLogin = (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
}

module.exports = {
    failedLogin,
    getToken
}