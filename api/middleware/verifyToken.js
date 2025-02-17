  // import jwt from "jsonwebtoken";
  // // middleware/verifyToken.js
  // export const verifyToken = (req, res, next) => {
  //   const token = req.cookies.jwt || req.header('x-auth-token');
  //   if (!token) {
  //     return res.status(401).json({ message: "Access denied. No token provided" });
  //   }
  
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.userId = decoded.userId; // Attach user ID to request object
  //     console.log("Decoded User ID:", req.userId);
  //     next();
  //   } catch (error) {
  //     res.status(401).json({ message: "Invalid token" });
  //   }
  // };
  

  import jwt from "jsonwebtoken";
  
  export const verifyToken = (req, res, next) => {
    // console.log("Cookies received:", req.cookies); // Log cookies

    const authHeader = req.headers.authorization || req.header("Authorization");
    console.log("Received Authorization Header:", authHeader); // Debug log
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid authorization format" });
    }
    // const token = req.cookies.jwt || req.header("Authorization")?.replace("Bearer ", "");
    // const token = req.header("Authorization")?.replace("Bearer ", "") || "";
    const token = authHeader.split(" ")[1];
    console.log("Extracted token:", token); // Log extracted token
  
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Log decoded token
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  };