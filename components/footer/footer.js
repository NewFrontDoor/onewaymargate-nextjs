/** @jsx jsx */
import { jsx } from "theme-ui";

const linkSx = {
	color: "white"
};

const Footer = () => {
	return (
		<div
			sx={{
				zIndex: 0,
				position: "relative",
				width: "100%",
				paddingTop: "2rem",
				paddingBottom: "2rem",
				backgroundColor: "#3b8beb",
				color: "background"
			}}
		>
			<div
				sx={{
					maxWidth: "1170px",
					margin: "auto",
					minHeight: "1em",
					fontSize: "0.85rem",
					textAlign: "center"
				}}
			>
				<p>© {new Date().getFullYear() >= 2022 ? new Date().getFullYear() : 2022} One Way Christian Church</p>
				<p>
					Website Maintained by{" "}
					<a sx={linkSx} href="https://newfrontdoor.org" target="_blank" rel="noreferrer noopener">
						New Front Door
					</a>
				</p>
			</div>
		</div>
	);
};

export default Footer;
