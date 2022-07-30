module.exports = {
    discord: {
        oauth_config: (authorization_token) => { // Define the function
            let data = { // Define "data"
              headers: { // Define "headers" of "data"
                "authorization": `Bearer ${authorization_token}` // Define the authorization
              }
            };
            return data; // Return the created object
          },
    }
}