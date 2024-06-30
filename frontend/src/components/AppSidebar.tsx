import { Menu } from "react-daisyui";
import { BookOpenText, CircleHelp, Home, LockKeyhole, NotebookPen, ReceiptText, Telescope } from "lucide-react";
import { Link } from "react-router-dom";

const AppSidebar = () => {
  return (
    <Menu className="p-4 w-64 h-full bg-base-200 text-content flex flex-col gap-2">
      <Menu.Item>
        <Link to="/">
          <Home size={20} /> Home
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/explore">
          <Telescope size={20} /> Explore
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/blog">
          <NotebookPen size={20} /> Blog
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/guidelines">
          <BookOpenText size={20} /> Guidelines
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/faq">
          <CircleHelp size={20} /> FAQ
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/terms">
          <ReceiptText size={20} /> Terms
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/privacy">
          <LockKeyhole size={20} /> Privacy Policy
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default AppSidebar;
