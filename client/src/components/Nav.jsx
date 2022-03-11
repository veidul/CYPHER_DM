import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth"

export default function Nav() {


	return (
		<>
			<header className="py-4 text-gray-500 bg-gradient-to-r from-nav-left to-nav-right body-font">
					<nav className="w-full h-full px-3 text-base">
						<div className="grid grid-cols-6 gap-2">
							<div className="col-start-1 col-end-5 flex justify-start">
								<Link
									to="/"
									className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
								>
									<span className=" font-mono ml-3 text-xl">-CYPHER_DM-</span>
								</Link>
							</div>

							<div className="flex justify-end col-start-6 col-end-6">
								<div>
									
									<Link to="/" className="mr-5 hover:text-white">
										Home
									</Link>
									<Link to="/about" className="mr-5 hover:text-white">
										About
									</Link>
									{Auth.loggedIn() ? (<Link onClick={Auth.logout} to="/login" className="mr-5 hover:text-white">
										Logout
									</Link>) : (<Link to="/login" className="mr-5 hover:text-white">
										Login
									</Link>)	
									}
								</div>
							</div>


						</div>
					</nav>
			</header>
		</>
	);
}
