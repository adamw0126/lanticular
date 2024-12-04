import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQComponent = () => {
    return (
        <div style={{ margin: "0 auto", padding: "20px" }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>What is Lenticular?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lenticular is a platform that transforms 2D content into realistic 3D motion using advanced AI technology.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>How do you convert 2D content to 3D?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Our AI uses our Neural Depth Engine to analyze 2D content and extrapolate depth information, creating a realistic 3D effect. This process is automatic, user-friendly, and requires no prior 3D modeling experience.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>What file formats do you support for 2D input?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        We support various file formats for 2D input, including PNG, JPG, and MP4.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                >
                    <Typography>What file formats do you support for 3D Motion output?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Supported formats for 3D Motion output include MP4 and GIF.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5a-content"
                    id="panel5a-header"
                >
                    <Typography>Why is GIF animation limited to only 360p?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        GIF animations are limited to 360p to ensure compatibility and efficient processing for online sharing and use cases.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FAQComponent;
