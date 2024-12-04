import { useEffect, useState } from "react";

const Loader = ({ progress = 0 }: { progress?: number }) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [content, setContent] = useState("Creating Depthmap...");

  useEffect(() => {
    // Update the content based on progress
    if (progress > 0) setContent("Downloading Depthmap...");

    // Smoothly increase the progress
    const increaseProgress = setInterval(() => {
      setDownloadProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 51) {
          clearInterval(increaseProgress); // Stop the interval at 20%
          return prevProgress; // Do not exceed 20%
        }
        return newProgress;
      });
    }, 1000);

    return () => {
      clearInterval(increaseProgress);
    };
  }, []);

  useEffect(() => {
    // Synchronize with external progress prop
    if (progress > downloadProgress) {
      setDownloadProgress(progress);
    }
  }, [progress, downloadProgress]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative h-16 w-16">
        {/* Spinning ring */}
        <div
          className="absolute inset-0 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
          style={{
            borderColor: "#fff", // Black color for the loader
            borderTopColor: "transparent",
          }}
        ></div>

        {/* Progress text */}
        <div
          className="absolute inset-0 flex items-center justify-center text-black text-sm font-semibold"
          style={{ color: "white" }}
        >
          {`${Math.round(downloadProgress)}%`}
        </div>
      </div>
      <span style={{ color: "white", marginLeft: "8px" }}>{content}</span>
    </div>
  );
};

export default Loader;
