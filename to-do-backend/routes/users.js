var express = require('express');
var router = express.Router();
import { GoogleLogin } from react-goo

//rota para autenticar o usuário
router.post('/login',(req,res) =>{
    const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [profilePic, setProfilePic] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const responseGoogle = (response) => {
		console.log(response);
		const {
			profileObj: { name, email, imageUrl },
		} = response;
		setName(name);
		setEmail(email);
		setProfilePic(imageUrl);
		setIsLoggedIn(true);
	};
	return (
		<div className="container">
			<GoogleLogin
				clientId="601083966949-4bt8pi6vc01tmdgtd1sup8rbggclp1l5.apps.googleusercontent.com"
				buttonText="Continuar com o Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
			/>
			{isLoggedIn ? (
				<div style={{ textAlign: "center" }}>
					<h1>User Information</h1>
					<img className="profile" src={profilePic} alt="Profile" />
					<p>Name: {name}</p>
					<p>Email: {email}</p>
					sessionStorage.setItem(true, isLoggedIn);
					window.location.reload();
				</div>
			) : (
				""
			)}
		</div>
	);
});

module.exports = router;
