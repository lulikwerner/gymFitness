export const cookieExtractor = (req) => {
    let token = null;
  
    if (req && req.cookies) {
      token = req.cookies['token'];
      console.log('eltoken en el cookies',token)
    }
  
    return token;
  };
  