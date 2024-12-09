import React, { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from 'axios';

const FAQComponent = () => {
    const [faqData, setFaqsData] = useState([]);
    
    useEffect(() => {
        getFAQs();
    }, []);

    const getFAQs = function () {
        axios.get('/api/getFAQsData')
        .then(response => {
            const { quizData } = response.data;
            setFaqsData(quizData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    return (
        <div>
            { faqData.map((faq, ind) => {
                return <Accordion key={faq._id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{faq.quiz}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {faq.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            }) }
        </div>
    );
};

export default FAQComponent;
