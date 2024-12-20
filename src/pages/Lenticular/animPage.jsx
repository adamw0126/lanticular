import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from 'react-responsive';
import LeftSection from './LeftSection';
import RightSidebar from './RightSection';

const AnimationPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 699 });
  // State for the Tabs
  const [value, setValue] = React.useState(0);
  const [isMotion, setIsMotion] = useState(true);
  const [isDepth, setIsDepth] = useState(true);
  const [isAnagl, setIsAnagl] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="app-container">
      <div className="left-section">
        <LeftSection isMotion={isMotion} isDepth={isDepth} />
      </div>
      <div className="right-sidebar">
        <RightSidebar isMotion={isMotion} setIsMotion={setIsMotion} isDepth={isDepth} setIsDepth={setIsDepth} isAnagl={isAnagl} setIsAnagl={setIsAnagl} isMobile={isMobile} />
      </div>
    </div>
  );
};

export default AnimationPage;