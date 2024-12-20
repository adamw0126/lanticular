import React from "react";

const UserCard = ({ email, onDisconnect }) => {
    return (
        <div style={styles.card}>
            {/* Icon Section */}
            <div style={styles.icon}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-3pgpby" focusable="false" aria-hidden="true"><path d="M45.5625 0.5625H2.4375C1.40039 0.5625 0.5625 1.40039 0.5625 2.4375V45.5625C0.5625 46.5996 1.40039 47.4375 2.4375 47.4375H45.5625C46.5996 47.4375 47.4375 46.5996 47.4375 45.5625V2.4375C47.4375 1.40039 46.5996 0.5625 45.5625 0.5625ZM33.7852 34.875C31.4062 37.0664 28.1602 38.3555 24.2871 38.3555C18.6797 38.3555 13.8281 35.1387 11.4668 30.4512C10.4607 28.4496 9.93695 26.2403 9.9375 24C9.9375 21.6797 10.4941 19.4883 11.4668 17.5488C13.8281 12.8555 18.6797 9.63867 24.2871 9.63867C28.1543 9.63867 31.4004 11.0625 33.8906 13.377L29.7773 17.4961C28.2891 16.0723 26.3965 15.3516 24.293 15.3516C20.5547 15.3516 17.3906 17.877 16.2598 21.2695C15.9727 22.1309 15.8086 23.0508 15.8086 24C15.8086 24.9492 15.9727 25.8691 16.2598 26.7305C17.3906 30.123 20.5547 32.6484 24.2871 32.6484C26.2207 32.6484 27.8613 32.1387 29.1445 31.2773C30.668 30.2578 31.6758 28.7402 32.0098 26.9414H24.2871V21.3867H37.8047C37.9746 22.3301 38.0625 23.3086 38.0625 24.3223C38.0625 28.6992 36.498 32.373 33.7852 34.875Z" fill="white"></path></svg>
            </div>

            {/* Email Section */}
            <div style={styles.email}>{email}</div>

            {/* Disconnect Button */}
            <button style={styles.disconnectButton} onClick={onDisconnect}>
                Disconnect
            </button>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: "#35354A",
        padding: "20px",
        minWidth: "max-content",
        textAlign: "center",
        color: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        width: 250
    },
    icon: {
        color: "#2C2C3C",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 10px auto",
        fontSize: "24px",
        fontWeight: "bold",
    },
    iconText: {
        fontSize: "20px",
    },
    email: {
        fontSize: "16px",
        marginBottom: "10px",
        fontWeight: '400',
    },
    disconnectButton: {
        backgroundColor: "transparent",
        color: "#d799f9",
        border: "none",
        fontSize: "16px",
        fontWeight: '400',
        cursor: "pointer",
    },
};

export default UserCard;
