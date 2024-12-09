import React, { useEffect, useState } from "react";

interface LoadingBarProps {
  loading: boolean;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + Math.random() * 10;
          return nextProgress < 95 ? nextProgress : 95;
        });
      }, 300);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="w-full rounded-full h-1.5 overflow-hidden fixed top-0 left-0">
      <div
        className="h-full transition-all duration-300 ease-in-out bg-secondary"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default LoadingBar;
