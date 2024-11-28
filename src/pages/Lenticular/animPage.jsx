import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LeftSection from './LeftSection';
import RightSidebar from './RightSection';

const AnimationPage = () => {
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
        <RightSidebar isMotion={isMotion} setIsMotion={setIsMotion} isDepth={isDepth} setIsDepth={setIsDepth} isAnagl={isAnagl} setIsAnagl={setIsAnagl} />
      </div>
    </div>
  );
};

export default AnimationPage;