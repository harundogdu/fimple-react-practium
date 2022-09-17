import { ToggleSwitchButton } from 'components';
import { useTheme } from 'contexts';

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <h3 className='navbar__container-logo'>Credit Calculator App</h3>
        <ul className='navbar__container-menu'>
          <li>
            <ToggleSwitchButton
              name='theme'
              onChange={toggleTheme}
              value={theme}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
