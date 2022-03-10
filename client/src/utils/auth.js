import decode from "jwt-decode";

class AuthService {
  // may need to add in getCyphers

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 10000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
  getToken() {
    return localStorage.getItem("id_token");
  }
  getUser() {
    return localStorage.getItem("user");
  }
  login(idToken, user) {
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("user", user);
    window.location.assign("/");
  }
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
    window.location.assign("/login");
  }
}

export default new AuthService();
