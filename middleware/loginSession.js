exports.loginSession = (req, res, next) => {
    const sessionTimeout = 10 * 60 * 1000; // 2 minutes
    let timer;
  
    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  
    const resetTimer = () => {
      clearTimer();
      // Set the timer again for the session timeout
      timer = setTimeout(() => {
        // Clear the session and send a response indicating timeout
        req.session.destroy((err) => {
          if (err) {
            console.error("Error destroying session:", err);
          }
          // Check if the response has been sent already
          if (!res.headersSent) {
            res.status(401).json({ message: "Session timeout" });
          }
        });
      }, sessionTimeout);
    };
  
    if (!req.session.userId) {
      return res.status(401).json({ message: "You must be logged in to access this" });
    }
  
    // User is logged in, reset the session timeout
    resetTimer();
    next();
  
    // Attach event listeners for various activities that reset the timer
    req.on("data", resetTimer);
    req.on("end", resetTimer);
  };
  