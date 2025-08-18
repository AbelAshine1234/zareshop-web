import { useState, useEffect, useRef } from 'react';
import TopBar from '../TopBar';
import SearchHeader from '../SearchHeader';
import AllCategoriesPopup from '../AllCategoriesPopup';
import TopPromotionBar from '../TopPromotionBar';

export default function AllHeader() {
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [catButtonPosition, setCatButtonPosition] = useState({ top: 0, left: 0, width: 0 });
  const mainLayoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (mainLayoutRef.current) {
        const rect = mainLayoutRef.current.getBoundingClientRect();
        setCatButtonPosition({
          top: rect.top + rect.height,
          left: rect.left,
          width: rect.width
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenAllCategories = (position) => {
    // Center the popup to match the centered search bar
    const viewportWidth = window.innerWidth;
    const popupWidth = Math.min(1200, viewportWidth * 0.9); // Max width with some margin
    const centeredLeft = (viewportWidth - popupWidth) / 2;
    
    setCatButtonPosition({
      top: position.top,
      left: centeredLeft,
      width: popupWidth
    });
    setIsCatOpen(true);
  };

  return (
    <>
      <TopPromotionBar />
      <TopBar />
      <div ref={mainLayoutRef}>
        <SearchHeader
          containerRef={mainLayoutRef}
          onOpenAllCategories={handleOpenAllCategories}
        />
      </div>
      
      <AllCategoriesPopup
        isOpen={isCatOpen}
        onClose={() => setIsCatOpen(false)}
        buttonPosition={catButtonPosition}
      />
    </>
  );
}
