# HealthCheckPro_Infosys_Internship_Oct2024_Team_01
Health Check Pro is a user-friendly health website built using the MERN stack

# landing page 
the page that is visible for all when new user enter in our page

# For Developers

## Setup

1. Clone the repository
2. Add a `.env` file in the backend directory with the following variables:
   - `MONGO_URI`: MongoDB connection string (e.g., `mongodb://localhost:27017/HealthCheckPro`)
   - `JWT_SECRET_KEY`: Secret key for signing JSON Web Tokens (e.g., `secret`)
   - `JWT_EXPIRES_IN`: Expiration time for JSON Web Tokens (e.g., `30d` for 30 days)
   - `NODE_ENV`: Environment mode (e.g., `development` or `production`)
   - `PORT`: Port number on which the server will run (e.g., `5000`)
   - `EMAIL`: Email address used for sending OTPs (e.g., `ashuvaidya2003@gmail.com`)
   - `EMAIL_PASSWORD`:"App Password" for the email account used for sending OTPs 
  ## Creating an App Password for Your Google Account

To create an app password for your Google account, follow these steps:

### Sign in to your Google Account:

1. Go to [Google Account](https://myaccount.google.com/).
2. Sign in with your email and password.

### Navigate to Security Settings:

1. On the left-hand side, click on "Security".

### Enable 2-Step Verification:

1. Under the "Signing in to Google" section, you should see "2-Step Verification". 
2. Click on it and follow the instructions to set it up if you haven't already.

### Generate App Password:

1. Once 2-Step Verification is enabled, go back to the "Security" section.
2. Under "Signing in to Google", you will now see an option for "App passwords". Click on it.
3. You may need to sign in again for security purposes.
4. Click on "Select app" and choose the app you need the password for, or select "Other (Custom name)" to name it yourself.
5. Click "Generate".

### Copy the App Password:

1. A 16-character password will be generated. Copy this password.
2. Use this password in your application where it asks for the email password.

This app password will allow your application to access your Google account securely without needing your main account password.

3. Run `npm install` in the root directory for installing the dependencies
4. Run `npm run dev` to start the development server

### Note: You can also use `yarn` instead of `npm`.

# Also Try admin panel for health check pro
## https://github.com/Ashish-Sunil-Vaidya/healthcheckpro-admin
