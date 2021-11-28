import React from "react";
import "./About.css";
import { Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import GithubIcon from "@material-ui/icons/GitHub";
import Creator from '../../images/Kushal.jfif'

const About = () => {
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">Developed By</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "12vmax", height: "12vmax", margin: "1.5vmax 0" }}
                            src={Creator}
                            alt="Founder"
                        />
                        <Typography>Kushal Soni</Typography>
                        <span>
                            ShopZone is a MERN stack Ecommerce website project created by me for learning purpose
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Visit my profile on :</Typography>
                        <a
                            href="https://www.linkedin.com/in/kushal-soni-48745b18a"
                            target="blank"
                        >
                            <LinkedInIcon className="linkedinSvgIcon" />
                        </a>

                        <a href="https://github.com/KUSHAL-31" target="blank">
                            <GithubIcon className="githubSvgIcon" />
                        </a>

                        <a href="https://www.instagram.com/_kushal31_/" target="blank">
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;