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

The moderation API can help you to identify personal information and mask it out - even if the user attempts to evade detection.

1. Define what type data you want to detect.
2. Send a request to the API with content.
3. We send back the detected values and original content with masked out values.

# Authentication

> To test your API key:

```shell
curl "https://moderationapi.com/api/v1/auth" \
  -H "Authorization: Bearer API_KEY"
```

> Response

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
  POST    /api/v1/projects/:id
```

You can create multiple projects and use the API to moderate at different levels simultaneously.
Each project has it's own [filter](#filter) that you can tweak to your preference.

New projects have to be created from the dashboard.

## The Project Object

> Project Object Example:

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

## Create a Project

Projects can only be created from the Moderation dashboard.

## Get a Project

> `GET /api/v1/projects/:id`

```shell
curl "https://moderationapi.com/api/v1/projects/:id" \
  -H "Authorization: Bearer API_KEY"
```

> Response

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
  "apiKey": "project-api-key"
}
```

Retrieves the details of an existing project. Supply the unique project ID from either a project creation request or the project list, and the API will return the corresponding project information.

### Parameters

#### No parameters

### Returns

Returns a project object if a valid identifier was provided.

## Update a Project

> `POST /api/v1/projects/:id`

```shell
curl "https://moderationapi.com/api/v1/projects/:id" \
  -H "Authorization: Bearer API_KEY"
  -H "Content-Type: application/json"
  -d json
```

> Response

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
  "apiKey": "project-api-key"
}
```

Updates the specific project by setting the values of the parameters passed. Any parameters not provided will be left unchanged.

### Parameters

| Parameter           | Type   | Description                                                                      |
| ------------------- | ------ | -------------------------------------------------------------------------------- |
| **name** optional   | string | Name of project. Only used internally.                                           |
| **filter** optional | object | Filter options to be used for this project. See [filter object](#filter-object). |

### Returns

Returns the project object if the update succeeded.

## Delete a Project

Projects can only be deleted from the Moderation dashboard.

<aside class="warning">
  The project API key will be invalidated and requests using the key will fail.
</aside>

## List All Projects

> `GET /api/v1/projects`

```shell
curl "https://moderationapi.com/api/v1/projects" \
  -H "Authorization: Bearer API_KEY"
```

> Response

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

#### No Parameters

### Returns

An array with all projects. Each entry in the array is a separate projects object. If no more projects are available, the resulting array will be empty. This request should only return an error if the API key is invalid.

# Filter

The filter is used to control the detection engine and the responses you get from the API.
You can change the filter from the moderation dashboard or programmatically using the API when [updating a project](#update-a-project).

## Filter object

> Filter Object Example:

```json
{
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
}
```

| Attribute     | Type    | Description                                                                                   |
| ------------- | ------- | --------------------------------------------------------------------------------------------- |
| **email**     | boolean | Turn on email detection                                                                       |
| **phone**     | boolean | Turn on phone number detection                                                                |
| **url**       | boolean | Turn on URL detection                                                                         |
| **masking**   | boolean | Return the original text with detected values masked.                                         |
| **emailMode** | string  | The detection mode for emails. Must be a supported [detection mode](#detection-modes).        |
| **phoneMode** | string  | The detection mode for phone numbers. Must be a supported [detection mode](#detection-modes). |
| **urlMode**   | string  | The detection mode for URLs. Must be a supported [detection mode](#detection-modes).          |
| **emailMask** | string  | Set a custom string to replace detected email values with.                                    |
| **phoneMask** | string  | Set a custom string to replace detected phone values with.                                    |
| **urlMask**   | string  | Set a custom string to replace detected URL values with.                                      |

## Detection modes

Each type of data can be detected using 3 different levels:

| Mode         | Description                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `NORMAL`     | Detect values that have been formatted correctly.                                                          |
| `SUSPICIOUS` | Detect values where the writer is trying to evade detection.                                               |
| `PARANOID`   | Detect even the slightest chance of containing personal information. This might result in false positives. |

We recommend to start with the `SUSPICIOUS` mode.

### Examples

| Value                                           | Detected by                         | Match response                      |
| ----------------------------------------------- | ----------------------------------- | ----------------------------------- |
| reach me on example@gmail.com                   | `NORMAL`, `SUSPICIOUS` , `PARANOID` | example@gmail.com                   |
| reach me on example at gmail dot com            | `SUSPICIOUS` , `PARANOID`           | example at gmail dot com            |
| reach me on example at that google email domain | `PARANOID`                          | example at that google email domain |

# Errors

The API uses the following error codes:

| Error Code | Meaning                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------- |
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

> Endpoints:

```text
  POST     /api/v1/moderation/text
```

The moderation API works by submitting content to the API and you get back the cleaned content and matches for the type of data you're looking for.

Currently the API detects [emails](#email), [phone numbers](#phone-number), and [urls](#urls).

# Text Moderation

## Overview

All types of text moderation uses the same endpoint `/api/v1/moderation/text`. What gets moderated depends on the projects [filter settings](#filter).

> `POST /api/v1/moderation/text`

```shell
curl "https://moderationapi.com/api/v1/moderation/text" \
  -H "Authorization: Bearer API_KEY"
  -H "Content-Type: application/json"
  -d json
```

> Response

```json
{
  "status": "success",
  "request": {
    "timestamp": 1612792574690
  },
  "original": "You can contact me on mr_robot[at]gmail|DOT|com or call me on 12 34 65 78",
  "content": "You can contact me on {{ email hidden }} or call me on {{ number hidden }}",
  "email": {
    "found": true,
    "mode": "SUSPICIOUS",
    "matches": ["mr_robot[at]gmail|DOT|com"]
  },
  "phone": {
    "found": true,
    "mode": "NORMAL",
    "matches": ["12 34 65 78"]
  },
  "url": {
    "found": false,
    "mode": "NORMAL",
    "matches": []
  }
}
```

### Parameters

| Parameter | Type   | Description                                                                      |
| --------- | ------ | -------------------------------------------------------------------------------- |
| **value** | string | The text content you want to moderate. Limited to 10.000 characters per request. |

### Returns

Returns the moderation object. Whether a data type is included depends if it is turned on in the projects [filter settings](#filter).

| Parameter   | Type   | Description                                                                                                |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| **status**  | string | error or success.                                                                                          |
| **content** | string | The moderated string. If masking is turned on in the [filter](#filter) all detected values will be hidden. |
| **email**   | object | [The email moderation response](#email). Only included if email detection is turned on.                    |
| **phone**   | object | [The phone moderation response](#phone-number). Only included if phone number detection is turned on.      |
| **url**     | object | [The URL moderation response](#urls). Only included if url detection is turned on.                         |

## Email

> Email Moderation Object Example:

```json
{
  "email": {
    "found": true,
    "mode": "SUSPICIOUS",
    "matches": ["mr_robot[at]gmail|DOT|com"]
  }
}
```

| Parameter   | Type             | Description                                                                                                                                                                                          |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **matches** | array of strings | The detected values in order of probability of being correct.                                                                                                                                        |
| **found**   | boolean          | Indicates whether the content contains an email. This does not always correspond to if any matches are found - ex. the text might intent to share personal data, but an exact match cannot be found. |
| **mode**    | string           | The [detection mode](#detection-modes) that has been set for emails in the project filter.                                                                                                           |

### Examples

| Value                                           | Detected by                         | Matches                             |
| ----------------------------------------------- | ----------------------------------- | ----------------------------------- |
| reach me on example@gmail.com                   | `NORMAL`, `SUSPICIOUS` , `PARANOID` | example@gmail.com                   |
| reach me on example at gmail dot com            | `SUSPICIOUS` , `PARANOID`           | example at gmail dot com            |
| reach me on example at that google email domain | `PARANOID`                          | example at that google email domain |

## Phone number

> Phone Moderation Object Example:

```json
{
  "phone": {
    "found": true,
    "mode": "NORMAL",
    "matches": ["12 34 56 78"]
  }
}
```

| Parameter   | Type             | Description                                                                                                                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **matches** | array of strings | The detected values in order of probability of being correct.                                                                                                                                              |
| **found**   | boolean          | Indicates whether the content contains a phone number. This does not always correspond to if any matches are found - ex. the text might intent to share personal data, but an exact match cannot be found. |
| **mode**    | string           | The [detection mode](#detection-modes) that has been set for phone numbers in the project filter.                                                                                                          |

### Examples

| Value                                   | Detected by                         | Matches                                 |
| --------------------------------------- | ----------------------------------- | --------------------------------------- |
| 12 34 56 78                             | `NORMAL`, `SUSPICIOUS` , `PARANOID` | 12 34 56 78                             |
| one two three four five six seven eight | `SUSPICIOUS` , `PARANOID`           | one two three four five six seven eight |
| 12 this 34 is 46 an 7 example 8         | `PARANOID`                          | 12 this 34 is 46 an 7 example 8         |

## URLs

> URL Moderation Object Example:

```json
{
  "url": {
    "found": true,
    "mode": "NORMAL",
    "matches": ["http://anonymous.com"]
  }
}
```

| Parameter   | Type             | Description                                                                                                                                                                                |
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **matches** | array of strings | The detected values in order of probability of being correct.                                                                                                                              |
| **found**   | boolean          | Indicates whether the content contains an URL. This does not always correspond to if any matches are found - ex. the text might intent to share a URL, but an exact match cannot be found. |
| **mode**    | string           | The [detection mode](#detection-modes) that has been set for URLs in the project filter.                                                                                                   |

### Examples

| Value                | Detected by                         | Matches              |
| -------------------- | ----------------------------------- | -------------------- |
| http://anonymous.com | `NORMAL`, `SUSPICIOUS` , `PARANOID` | http://anonymous.com |
| anonymous.com        | `SUSPICIOUS` , `PARANOID`           | anonymous.com        |
| anonymous(dot)com    | `PARANOID`                          | anonymous(dot)com    |

## Addresses

Not available yet

## Social Media Handles

Not available yet

```

```
