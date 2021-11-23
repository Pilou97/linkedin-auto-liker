# Linkedin Autoliker

Auto like new post of a given company in linkedin
It will only like the first post on the page

Use at your own risk


# How to use

```
git clone ...
npm i
npm run start
```

There are 5 environment variables, please fill the .env file for your purpose

## Environment variable

 - USERNAME: your mail address or phone number of your linkedin account
 - PASSWORD: your password of your linkedin account
 - ALL_POST_URL: the url of the posts to like
 - COMPANY_NAME: the name of the company (name used on the company's account page)
 - TIME_INTERVAL: the interval in **seconds** the programm will like, each 900 seconds for instance, default: 900

# TODO:

 - scroll the user account and not the company account
 - improve log
