import { Button, Drawer } from "react-daisyui";
import AppSidebar from "./AppSidebar";
import { Menu } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AppSidebarButton = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen(open => !open);
  }, []);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location]);
  return (
    <Drawer className="w-fit" open={open} onClickOverlay={toggleOpen} side={<AppSidebar />}>
      <Button size="sm" shape="circle" onClick={toggleOpen}>
        <Menu size={20} />
      </Button>
    </Drawer>
  );
};

export default AppSidebarButton;
