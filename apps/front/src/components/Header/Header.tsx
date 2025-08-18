import "./Header.scss";

import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";
import { useModal } from "../../contexts/modalContext";

export default function Header() {
  const { openModal } = useModal();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <header>
      <div className="logo">
        <h1>DofusGroup</h1>
      </div>
      <nav>
        <ul>
          <li className="nav_link link">
            <Link to="/events">Évènements</Link>
          </li>
          <li className="nav_link link">
            <Link to="/about">À propos</Link>
          </li>
          
          {!isLoading && (
            <>
              {isAuthenticated && user ? (
                <>
                  <li className="nav_link">
                    <Link to="/profile">Bonjour, {user.username}</Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="button"
                    >
                      Déconnexion
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      type="button"
                      onClick={() => openModal("login")}
                      className="button"
                    >
                      Connexion
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openModal("register")}
                      className="button"
                    >
                      Inscription
                    </button>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
