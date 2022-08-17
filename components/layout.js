import React from "react";
import PropTypes from "prop-types";
import Header from "./header/header";
import Banner from "./banner";
import Footer from "./footer/footer";
import Head from "next/head";

const Layout = ({ menuData, mainData, children }) => {
	return (
		<div>
			<Head>
				<title>{mainData.title} | One Way Christian Church Margate</title>
				<meta
					name="description"
					content="One Way Christian Church is located in Margate, Tasmania. Our vision is to see the people of Margate, the Channel and beyond come to know Jesus Christ."
				/>
			</Head>
			<Header navlinks={menuData.menuitems} />
			<Banner data={mainData} />
			{children}
			<Footer />
		</div>
	);
};

Layout.propTypes = {
	menuData: PropTypes.object.isRequired,
	mainData: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
};

export default Layout;
