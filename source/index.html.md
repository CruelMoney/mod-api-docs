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

Welcome to the [Moderation API](https://moderationapi.com).

The moderation API can help you to identify personal information and mask it out - even if the user attempts to bypass detection.

1. Define what type data you want to detect.
2. Send a request to the API with content.
3. We send back the detected values and original content with masked out values.

# Authentication

> To test your API key:

```shell
curl "https://moderationapi.com/api/v1/auth" \
  -H "Authorization: Bearer API_KEY"
```

> The above endpoint returns a JSON object like this:

```json
{
  "status": "success",
  "message": "Valid API key",
  "project": "My Project Name"
}
```

Moderation API uses keys to allow access to the API. You can get an API key by [creating a project](https://moderationapi.com/app/projects) in the moderation dashboard.

Moderation API expects the key to be included in all API requests to the server in a header that looks like the following:

`Authorization: Bearer API_KEY`

<aside class="notice">
You must replace <code>API_KEY</code> with your project API key.
</aside>

# Account

```shell
curl "https://moderationapi.com/api/v1/account" \
  -H "Authorization: Bearer API_KEY"
```

> The above endpoint returns a JSON object like this:

```json
{
  "status": "success",
  "message": "Valid API key",
  "project": "My Project Name"
}
```

To check your account status at any time you can use this endpoint.

It will respond with your quota levels and current usage levels. Usage resets at the start of your billing period.

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
