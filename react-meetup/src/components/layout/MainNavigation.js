import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import classes from "./MainNavigation.module.css";

export default function MainNavigation({ favouritesMeetups }) {
  // States for animation
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // When user scroll vertically, modify states
  useEffect(() => {
    /**
     * Function that shows the header or not based on wheter the user
     * scroll down or up.
     */
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.header
      className={classes.header}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      data-testid="navigation-header"
    >
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <NavLink to={"/meetups"} className={({ isActive }) => [isActive ? classes.activeNav : ""]} >All Meetup</NavLink>
          </li>
          <li>
            <NavLink to={"/create"} className={({ isActive }) => [isActive ? classes.activeNav : ""]} >Add New Meetup</NavLink>
          </li>
          <li>
            <NavLink to={"/favourites"} className={({ isActive }) => [isActive ? classes.activeNav : ""]}>
              My Favourites <span className={classes.badge}>{favouritesMeetups}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
