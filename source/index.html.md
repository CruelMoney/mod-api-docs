---
title: API Reference

# language_tabs: # must be one of https://git.io/vQNgJ
#   # - shell

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
  "id": "601fcbcd454faa5be1d36cf6",
  "created_at": "2021-02-07T11:15:25.561Z",
  "paid_plan_name": "Lite",
  "text_api_quota": 100,
  "text_api_usage_this_month": 45,
  "current_project": {
    "name": "My Project Name"
  }
}
```

To check your account status at any time you can use this endpoint.

It will respond with your quota levels and current usage levels. Usage resets at the start of your billing period.

# Projects

> Endpoints:

```text
  GET     /api/v1/projects
  GET     /api/v1/projects/:id
  PUT     /api/v1/projects/:id
  DELETE  /api/v1/projects/:id
  GET     /api/v1/projects
```

You can create multiple projects and use the API to moderate at different levels simultaneously.
Each project has it's own [filter](#filter) that you can tweak to your preference.

New projects have to be created from the dashboard.

## The Project Object

> Project Object:

```json
{
  "_id": "601fe2eef2538064a22d496b",
  "filter": {
    "email": true,
    "phone": true,
    "url": true,
    "masking": true,
    "emailMode": "NORMAL",
    "phoneMode": "NORMAL",
    "urlMode": "NORMAL",
    "emailMask": "{{ email hidden }}",
    "phoneMask": "{{ number hidden }}",
    "urlMask": "{{ URL hidden }}"
  },
  "name": "My Project Name",
  "apiKey": "project-api-key" // Is replaced with actual API Key
}
```

| Attribute  | Type   | Description                                                                     |
| ---------- | ------ | ------------------------------------------------------------------------------- |
| **\_id**   | string | Unique identifier for the project.                                              |
| **filter** | object | The current filter settings for the project. See [filter object](#filter)       |
| **name**   | string | Detect even the slightest chance of containing personal information.            |
| **apiKey** | string | The api key to be used with this project. See [authentication](#authentication) |

## List All Projects

```shell
curl "https://moderationapi.com/api/v1/projects" \
  -H "Authorization: Bearer API_KEY"
```

> The above endpoint returns a JSON array like this:

```json
[
  {
    "_id": "601fe2eef2538064a22d496b",
    "filter": {
      "email": true,
      "phone": true,
      "url": true,
      "masking": true,
      "emailMode": "NORMAL",
      "phoneMode": "NORMAL",
      "urlMode": "NORMAL",
      "emailMask": "{{ email hidden }}",
      "phoneMask": "{{ number hidden }}",
      "urlMask": "{{ URL hidden }}"
    },
    "name": "My Project Name",
    "apiKey": "project-api-key"
  }
]
```

Returns a list of your projects. The projects are returned sorted by creation date, with the most recent project appearing first.

### Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| \-        | \-   | \-          |

### Returns

An array with all projects. Each entry in the array is a separate projects object. If no more projects are available, the resulting array will be empty. This request should only return an error if the API key is invalid.

## Get a Project

## Update a Project

## Delete a Project

# Filter

## Detection modes

Each type of data can be detected using 3 different modes:

| Mode           | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| **Normal**     | Detect even the slightest chance of containing personal information. |
| **Suspicious** | Detect even the slightest chance of containing personal information. |
| **Paranoid**   | Detect even the slightest chance of containing personal information. |

Matches - In order of most confident detection.

# Errors

The API uses the following error codes:

| Error Code | Meaning                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------- |
| 200        | OK                                                                                        |
| 202        | Accepted -- Your request is has been accepted for processing                              |
| 400        | Bad Request -- Your request is invalid.                                                   |
| 401        | Unauthorized -- Your API key is wrong.                                                    |
| 403        | Forbidden -- The requested resource is for administrators only.                           |
| 404        | Not Found -- The specified resource could not be found.                                   |
| 405        | Method Not Allowed -- You tried to access a resource with an invalid method.              |
| 429        | Too Many Requests -- See [rate limits](#rate-limits)                                      |
| 500        | Internal Server Error -- We had a problem with our server. Try again later.               |
| 503        | Service Unavailable -- We're temporarily offline for maintenance. Please try again later. |

## Rate limits

The Moderation API rate limit is 100 parallel requests per second.

We may reduce limits to prevent abuse, or increase limits to enable high-traffic applications. To request an increased rate limit, please contact support.

### Handling rate limts

A basic technique for integrations to gracefully handle limiting is to watch for `429` status codes and build in a retry mechanism. The retry mechanism should follow an exponential backoff schedule to reduce request volume when necessary.

# Moderation

# Text Content

## Email

## Phone number

## URLs

## Addresses

Not available yet

## Social Media Handles

Not available yet

```

```
