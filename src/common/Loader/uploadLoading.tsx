import { useEffect, useState } from "react";

const Loader = ({ progress }: { progress?: number }) => {

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [content, setContent] = useState("Creating Depthmap...")
  const increaseProgress = setInterval(()=>{
    setDownloadProgress(downloadProgress + 1);
    if (downloadProgress == 20) clearInterval(increaseProgress);
  }, 1000)

  useEffect(()=>{
    if (progress) setContent("Downloading Depthmap...");
    if (progress > downloadProgress) setDownloadProgress(progress);
  }, [progress])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative h-16 w-16">
        {/* Spinning ring */}
        <div
          className="absolute inset-0 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
          style={{
            borderColor: '#000', // Black color for the loader
            borderTopColor: 'transparent',
          }}
        ></div>
        
        {/* Progress text */}
        <div
          className="absolute inset-0 flex items-center justify-center text-black text-sm font-semibold"
          style={{ color: 'black' }}
        >
          {downloadProgress ? `${Math.round(downloadProgress)}%` : ''}
        </div>
      </div>
      <span style={{color: 'black'}}>{content}</span>
    </div>
  );
};

export default Loader;
