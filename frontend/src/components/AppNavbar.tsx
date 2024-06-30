import ThemeContext, { Theme } from "@src/contexts/ThemeContext";
import { useCallback, useContext } from "react";
import { Navbar, Avatar, Swap, Dropdown, Button } from "react-daisyui";
import { Sun, Moon, Search, User, Settings, Bookmark, FilePlus, LogOut, BookUser } from "lucide-react";
import AppSidebarButton from "./AppSidebarButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { filter } from "lodash";
import SearchContext from "@src/contexts/SearchContext";
import SnippetTag from "./SnippetTag";
import AuthContext from "@src/contexts/AuthContext";

const SearchBar = () => {
  const [searchInfo, setSearchInfo] = useContext(SearchContext);
  return (
    <div className="md:mx-12 lg:mx-20 transition-all flex grow justify-center px-4">
      <label className="sm:h-10 grow input input-bordered flex items-center gap-2 transition-all">
        {searchInfo.tags.map((tagName, idx) => (
          <SnippetTag
            key={idx}
            colorless={true}
            removable={true}
            onRemove={() =>
              setSearchInfo(searchInfo => ({
                ...searchInfo,
                tags: filter(searchInfo.tags, otherTagName => otherTagName != tagName)
              }))
            }
          >
            {tagName}
          </SnippetTag>
        ))}
        <input type="text" className="grow" defaultValue={searchInfo.title} placeholder="Search..." />
        <Search size={16} className="text-neutral-content " />
      </label>
    </div>
  );
};

const ModulesLeft = () => {
  const location = useLocation();
  return (
    <div className="flex grow">
      <AppSidebarButton />
      {location.pathname != "/" && <SearchBar />}
    </div>
  );
};

const UserModule = () => {
  const [authDetails, setAuthDetails] = useContext(AuthContext);
  return (
    <Dropdown end>
      <Avatar
        tabIndex={0}
        size="xs"
        shape="circle"
        className="rounded-full hover:ring-4 hover:ring-base-content/15 transition-all cursor-pointer"
      >
        <div>
          <img src="https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg" />
        </div>
      </Avatar>
      <Dropdown.Menu className="mt-3 w-52 menu-sm">
        <Dropdown.Item>
          <Link className="flex gap-1.5 items-center" to="/user/arneshrc">
            <User size={16} />
            Profile
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link className="flex gap-1.5 items-center" to="/user/arneshrc/settings">
            <Settings size={16} /> Settings
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link className="flex gap-1.5 items-center" to="/new">
            <FilePlus size={16} /> New Snippet
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link className="flex gap-1.5 items-center" to="/user/arneshrc/authored">
            <BookUser size={16} />
            My Snippets
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link className="flex gap-1.5 items-center" to="/user/arneshrc/saved">
            <Bookmark size={16} />
            Saved Snippets
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <a
            className="flex gap-1.5 items-center"
            onClick={() => setAuthDetails({ loggedIn: false, username: "", token: "" })}
          >
            <LogOut size={16} /> Logout
          </a>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const SignInButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate("/signin");
      }}
      color="neutral"
    >
      Sign In
    </Button>
  );
};

const ModulesRight = () => {
  const [authDetails] = useContext(AuthContext);
  const [theme, setTheme] = useContext(ThemeContext);
  const toggleTheme = useCallback(() => {
    setTheme(theme => (theme == Theme.Light ? Theme.Dark : Theme.Light));
  }, [setTheme]);
  return (
    <div className="flex gap-6 justify-end">
      <Swap
        rotate={true}
        active={theme == Theme.Dark}
        role="theme-switcher"
        onElement={<Moon size={24} />}
        offElement={<Sun size={24} />}
        onChange={toggleTheme}
        className="theme-controller"
      />
      {authDetails.loggedIn ? <UserModule /> : <SignInButton />}
    </div>
  );
};

const AppNavbar = () => {
  return (
    <Navbar className="z-30 bg-base-100 border-b px-3 border-base-content/20 flex gap-2">
      <ModulesLeft />
      <ModulesRight />
    </Navbar>
  );
};

export default AppNavbar;
