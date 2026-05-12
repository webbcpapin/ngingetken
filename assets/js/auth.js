const ADMIN_PASSWORD = 'b3d3l3w';
const ADMIN_SESSION_KEY = 'ngingetken_admin_logged_in';

function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

function getLoginTarget() {
  const params = new URLSearchParams(location.search);
  return params.get('next') || 'dashboard.html';
}

function requireAdminAccess() {
  if (isAdminLoggedIn()) return;
  const next = encodeURIComponent(location.pathname.split('/').pop() + location.search);
  location.replace('login.html?next=' + next);
}

function handleAdminLogin(form) {
  const password = form.password.value.trim();
  const errorBox = document.getElementById('loginError');
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    location.href = getLoginTarget();
    return;
  }
  if (errorBox) errorBox.textContent = 'Password admin tidak sesuai.';
  form.password.value = '';
  form.password.focus();
}

function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  location.href = 'login.html';
}
