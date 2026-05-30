const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Not Authorized' });
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.status(403).json({ error: 'Already Authorized' });
};

const isTargetUser = (req, res, next) => {
  const requestedUsername = req.params.username;
  
  if (req.user && req.user.username === requestedUsername) {
    return next();
  }

  res.status(403).json({ error: 'Forbidden' });
}

export { isLoggedIn, isNotLoggedIn, isTargetUser };