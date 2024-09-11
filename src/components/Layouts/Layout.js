import React from "react";
import {Helmet} from "react-helmet";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <meta name="author" content={author}/>
                <title>{title}</title>
            </Helmet>
            <main style={{minHeight: "70vh"}}>
                <ToastContainer />
                {children}
            </main>
        </div>
    );
};

Layout.defaultProps = {
    title: "User flow",
    description: "mern stack project",
    keywords: "mongodb, express, react, nodejs",
    author: "Ranga"
}

export default Layout;
