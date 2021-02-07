---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - shell

toc_footers:
  - <a class="only-signed-out" href='https://moderationapi.com/app'>Sign in</a>
  - <a class="only-signed-out" href='https://moderationapi.com/app'>Try the API</a>
  - <a class="only-signed-in" href='https://moderationapi.com/app'>Go to Dashboard</a>

includes:
  # - errors

search: true

code_clipboard: true
---

# Introduction

Welcome to the Kittn API! You can use our API to access Kittn API endpoints, which can get information on various cats, kittens, and breeds in our database.

We have language bindings in Shell, Ruby, Python, and JavaScript! You can view code examples in the dark area to the right, and you can switch the programming language of the examples with the tabs in the top right.

This example API documentation page was created with [Slate](https://github.com/slatedocs/slate). Feel free to edit it and use it as a base for your own API's documentation.

# Authentication

> To authorize, use this code:

```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here" \
  -H "Authorization: Bearer API_KEY"
```

> Make sure to replace `API_KEY` with your API key.

Kittn uses API keys to allow access to the API. You can register a new Kittn API key at our [developer portal](http://example.com/developers).

Kittn expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: Bearer API_KEY`

<aside class="notice">
You must replace <code>API_KEY</code> with your personal API key.
</aside>

# Account

# Projects

## List All Projects

## Create a Project

## Get a Project

## Update a Project

## Delete a Project

# Errors

<aside class="notice">
This error section is stored in a separate file in <code>includes/_errors.md</code>. Slate allows you to optionally separate out your docs into many files...just save them to the <code>includes</code> folder and add them to the top of your <code>index.md</code>'s frontmatter. Files are included in the order listed.
</aside>

The Kittn API uses the following error codes:

| Error Code | Meaning                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------- |
| 400        | Bad Request -- Your request is invalid.                                                   |
| 401        | Unauthorized -- Your API key is wrong.                                                    |
| 403        | Forbidden -- The kitten requested is hidden for administrators only.                      |
| 404        | Not Found -- The specified kitten could not be found.                                     |
| 405        | Method Not Allowed -- You tried to access a kitten with an invalid method.                |
| 406        | Not Acceptable -- You requested a format that isn't json.                                 |
| 410        | Gone -- The kitten requested has been removed from our servers.                           |
| 418        | I'm a teapot.                                                                             |
| 429        | Too Many Requests -- You're requesting too many kittens! Slow down!                       |
| 500        | Internal Server Error -- We had a problem with our server. Try again later.               |
| 503        | Service Unavailable -- We're temporarily offline for maintenance. Please try again later. |

# Moderation

# Text Content

### Detection modes

Each type of data can be detected using 3 different modes:

| Mode           | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| **Normal**     | Detect even the slightest chance of containing personal information. |
| **Suspicious** | Detect even the slightest chance of containing personal information. |
| **Paranoid**   | Detect even the slightest chance of containing personal information. |

Matches - In order of most confident detection.

## Email

## Phone number

## URLs

## Addresses

Not available yet

## Social Media Handles

Not available yet
