import React from "react";

const PolicyContent = () => {
    return (
        <div style={styles.container}>
            {/* Header Section */}
            <h1 style={styles.header}>Privacy Policy</h1>
            <h2 style={styles.subHeader}>Your Privacy Rights</h2>

            {/* Introduction Section */}
            <section>
                <h3 style={styles.sectionTitle}>Welcome to Immersity AI</h3>
                <p style={styles.paragraph}>
                    This Privacy Policy discloses the privacy practices for{" "}
                    <a href="http://localhost:5173" style={styles.link}>
                        Lenticular
                    </a>{" "}
                    and our mobile applications where this policy is posted (collectively
                    referred to as our "site"). You agree to the terms of the privacy
                    policy when you use this site.
                </p>
            </section>

            {/* Information Collection Section */}
            <section>
                <h3 style={styles.sectionTitle}>
                    Information Collection, Use, and Sharing
                </h3>
                <h4 style={styles.subSectionTitle}>Information We Collect</h4>
                <p style={styles.paragraph}>
                    We have access to and collect personal information from you, including
                    personally identifiable information that you voluntarily give to us
                    via email, when you post or upload on our websites and applications,
                    submit a resume and apply for jobs, email us, sign up for an account,
                    posting a comment or text on any forum or feedback field, or through
                    other direct contact from you.
                </p>
                <p style={styles.paragraph}>
                    We collect the following types of information from and about you:
                </p>

                {/* Contact Information */}
                <p style={styles.paragraph}>
                    <strong style={styles.bold}>Contact information.</strong> For example,
                    we may collect your name, user name and email address. We may also
                    collect other contact information, such as your street address, phone
                    number and company name. We may also collect photographs that you
                    upload to our site.
                </p>

                
                <p style={styles.paragraph}>
                    <strong style={styles.bold}>Financial information.</strong> For paid Services, we may also collect financial information regarding payment, including account numbers, and other contact information, such as your street address, phone number and company name.

                </p>
                <p style={styles.paragraph}>
                    <strong style={styles.bold}>Information you submit or post.</strong> We collect information or photographs you post in a public space on our site.  We also collect information when you contact us.
                </p>
                <p style={styles.paragraph}>
                    <strong style={styles.bold}>Usage information.</strong> We collect data regarding when you visit our websites and applications, including when you view or click on content.
                </p>
                <p style={styles.paragraph}>
                    <strong style={styles.bold}>Device and location information.</strong> We collect information about your IP address, proxy server, operating system, web browser and add-ons, device features and your mobile carrier.

                </p>
            </section>
        </div>
    );
};

// Inline CSS styles
const styles = {
    container: {
        // backgroundColor: "#12121B",
        color: "#ffffff",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        margin: "0 auto",
        lineHeight: "1.6",
    },
    header: {
        textAlign: "center",
        fontSize: "48px",
        fontWeight: "700",
        margin: "0 0 10px 0",
    },
    subHeader: {
        textAlign: "center",
        fontSize: "33px",
        fontWeight: "600",
        marginBottom: "30px",
    },
    sectionTitle: {
        fontSize: "20px",
        fontWeight: "600",
        margin: "20px 0 10px 0",
    },
    subSectionTitle: {
        fontSize: "18px",
        fontWeight: "500",
        margin: "10px 0",
    },
    paragraph: {
        fontSize: "16px",
        marginBottom: "15px",
        fontFamily: "Campton Webfont,Arial,sans-serif"
    },
    link: {
        color: "#A596FF",
        textDecoration: "underline",
    },
    bold: {
        fontWeight: "500",
    },
};

export default PolicyContent;
