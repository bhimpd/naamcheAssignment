exports.loginSession = (req, res, next) => {
    const sessionTimeout = 10 * 60 * 1000; 
    let timer;
  
    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  
    const resetTimer = () => {
      clearTimer();
      timer = setTimeout(() => {
        req.session.destroy((err) => {
          if (err) {
            console.error("Error destroying session:", err);
          }
          if (!res.headersSent) {
            res.status(401).json({ message: "Session timeout" });
          }
        });
      }, sessionTimeout);
    };
  
    if (!req.session.userId) {
      return res.status(401).json({ message: "You must be logged in to access this" });
    }
  
    resetTimer();
    next();
  
    req.on("data", resetTimer);
    req.on("end", resetTimer);
  };
  