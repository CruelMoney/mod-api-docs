---
title: API Reference

# language_tabs: # must be one of https://git.io/vQNgJ
#   # - shell

toc_footers:
  - <a class="only-signed-out" href='https://moderationapi.com/app'>Sign in</a>
  - <a class="only-signed-out" href='https://moderationapi.com'>Try the API</a>
  - <a class="only-signed-in" href='https://moderationapi.com/app'>Go to Dashboard</a>

includes:
  # - errors

search: true

code_clipboard: true
---

# Introduction

Welcome to the [Moderation API](https://moderationapi.com).

The moderation API can help you to identify personal information and mask it out - even if the user attempts to evade detection.

1. Define what [type of data](#filter-object) you want to detect.
2. [Send a request](#text-moderation) to the API with content.
3. We send back the detected values and original content with masked out values.

![Chat email detection](/images/chat.png "Chat email detection")

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
    "email": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ email hidden }}"
    },
    "phone": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ phone hidden }}"
    },
    "url": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ url hidden }}"
    },
    "address": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ address hidden }}"
    }
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
    "email": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ email hidden }}"
    },
    "phone": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ phone hidden }}"
    },
    "url": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ url hidden }}"
    },
    "address": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ address hidden }}"
    }
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
    "email": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ email hidden }}"
    },
    "phone": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ phone hidden }}"
    },
    "url": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ url hidden }}"
    },
    "address": {
      "enabled": true,
      "mode": "NORMAL",
      "mask": "{{ address hidden }}"
    }
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
      "email": {
        "enabled": true,
        "mode": "NORMAL",
        "mask": "{{ email hidden }}"
      },
      "phone": {
        "enabled": true,
        "mode": "NORMAL",
        "mask": "{{ phone hidden }}"
      },
      "url": {
        "enabled": true,
        "mode": "NORMAL",
        "mask": "{{ url hidden }}"
      },
      "address": {
        "enabled": true,
        "mode": "NORMAL",
        "mask": "{{ address hidden }}"
      }
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

## Filter Object

> Filter Object Example:

```json
{
  "email": {
    "enabled": true,
    "masking": true,
    "mode": "NORMAL",
    "mask": "{{ email hidden }}"
  },
  "phone": {
    "enabled": true,
    "masking": true,
    "mode": "NORMAL",
    "mask": "{{ phone hidden }}"
  },
  "name": {
    "enabled": true,
    "masking": true,
    "mode": "NORMAL",
    "mask": "{{ name hidden }}",
    "components": ["first", "middle", "last"]
  }
}
```

| Attribute     | Type   | Description                                                                        |
| ------------- | ------ | ---------------------------------------------------------------------------------- |
| **email**     | object | Data type settings for email detection. [See more](#email)                         |
| **phone**     | object | Data type settings for phone number detection. [See more](#phone-number)           |
| **url**       | object | Data type settings for URL detection. [See more](#urls)                            |
| **address**   | object | Data type settings for address detection. [See more](#address)                     |
| **name**      | object | Data type settings for name detection. [See more](#person-names)                   |
| **username**  | object | Data type settings for username detection. [See more](#usernames)                  |
| **profanity** | object | Data type settings for profanity detection. [See more](#swear-words-and-profanity) |

### Data type settings

| Attribute      | Type            | Description                                                                                                                                                                       |
| -------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **enabled**    | boolean         | Turn detection of this data type on or off.                                                                                                                                       |
| **mode**       | string          | The detection mode. Must be a supported [detection mode](#detection-levels).                                                                                                      |
| **masking**    | boolean         | Turn masking of this data type on or off.                                                                                                                                         |
| **mask**       | string          | The mask that to be used on detected values if masking is turned on.                                                                                                              |
| **components** | array of string | What components of the data type you wish to detect. For example only last names or street names. Look up supported components under the specific [data types](#text-moderation). |

## Detection Levels

Most types of data can be detected using 3 different levels. Some only support one of the three.

| Mode         | Description                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `NORMAL`     | Detect values that have been formatted correctly.                                                          |
| `SUSPICIOUS` | Detect values where the writer is trying to evade detection.                                               |
| `PARANOID`   | Detect even the slightest chance of containing personal information. This might result in false positives. |

We recommend to start with the `NORMAL` mode and increase the level if needed.

### Examples

| Value                                           | Detected by                         | Match response                      |
| ----------------------------------------------- | ----------------------------------- | ----------------------------------- |
| reach me on example@gmail.com                   | `NORMAL`, `SUSPICIOUS` , `PARANOID` | example@gmail.com                   |
| reach me on example at gmail dot com            | `SUSPICIOUS` , `PARANOID`           | example at gmail dot com            |
| reach me on example at that google email domain | `PARANOID`                          | example at that google email domain |

## Update a Filter

A filter can be updated using the [project update endpoint](#update-a-project).

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

Currently the API detects

- [Emails](#email)
- [Phone numbers](#phone-number)
- [URLs](#urls)
- [Physical Addresses](#address)
- [Names](#person-names)
- [Usernames](#usernames)
- [Profanity](#swear-words-and-profanity)

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
  "content_moderated": true,
  "data_found": true,
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
  },
  "address": {
    "found": false,
    "mode": "NORMAL",
    "matches": []
  },
  "name": {
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

| Parameter             | Type    | Description                                                                                                                                                       |
| --------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **status**            | string  | error or success.                                                                                                                                                 |
| **content**           | string  | The moderated string. If masking is turned on in the [filter](#filter) all detected values will be hidden.                                                        |
| **content_moderated** | boolean | A boolean indicating if the returned content is different from the original text.                                                                                 |
| **data_found**        | boolean | A boolean indicating if any data has been found. Equal to checking each `found` field on the data types.                                                          |
| **[data type]**       | object  | Each enabled data type get's it's own field in the response. Only included if detection is enabled for the data type. See the responses for each data type below. |

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
| **mode**    | string           | The [detection mode](#detection-levels) that has been set for emails in the project filter.                                                                                                          |

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
| **mode**    | string           | The [detection mode](#detection-levels) that has been set for phone numbers in the project filter.                                                                                                         |

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
| **mode**    | string           | The [detection mode](#detection-levels) that has been set for URLs in the project filter.                                                                                                  |

### Examples

| Value                | Detected by                         | Matches              |
| -------------------- | ----------------------------------- | -------------------- |
| http://anonymous.com | `NORMAL`, `SUSPICIOUS` , `PARANOID` | http://anonymous.com |
| anonymous.com        | `SUSPICIOUS` , `PARANOID`           | anonymous.com        |
| anonymous(dot)com    | `PARANOID`                          | anonymous(dot)com    |

## Address

> Address Moderation Object Example:

```json
{
  "address": {
    "found": true,
    "mode": "NORMAL",
    "matches": ["767 5th Ave, New York, NY 10153"]
  }
}
```

Address detection uses an advanced AI trained specifically for detecting addresses. The AI works well on a wide range of addresses, but can increase the API response time. It will detect everything from house numbers to cities and postal codes for both real and imaginary addresses.

<aside class="notice">
The address AI works best with english texts - if you need additional languages, contact us at support@moderationapi.com
</aside>

| Parameter   | Type             | Description                                                                                    |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| **matches** | array of strings | The detected addresses in the order they're found in the text.                                 |
| **found**   | boolean          | Indicates whether the content contains an address.                                             |
| **mode**    | string           | The [detection mode](#detection-levels) that has been set for addresses in the project filter. |

### Examples

| Value with highlighted `matches`                                  |
| ----------------------------------------------------------------- |
| You can visit our store on **`767 5th Ave, New York, NY 10153`**. |
| They live on the **`Abbey Road`**, but it's a long way from here. |
| **`Diagon Alley 123`** is hidden behind the brick wall.           |

## Person Names

> Person names Moderation Object Example:

```json
{
  "name": {
    "found": true,
    "mode": "NORMAL",
    "matches": ["Albus Dumbledore"]
  }
}
```

| Parameter   | Type             | Description                                                                                |
| ----------- | ---------------- | ------------------------------------------------------------------------------------------ |
| **matches** | array of strings | The detected names in the order they're found in the text.                                 |
| **found**   | boolean          | Indicates whether the content contains a name.                                             |
| **mode**    | string           | The [detection mode](#detection-levels) that has been set for names in the project filter. |

### Only detect parts of the name

If you only want to hide last names you can change the level detected name components in the filter. Either using the API or in the dashboard.

### Examples

| Value                                | Components                    | Matches                   |
| ------------------------------------ | ----------------------------- | ------------------------- |
| My name is Albus Percival Dumbledore | `['first', 'middle', 'last']` | Albus Percival Dumbledore |
| My name is Albus Percival Dumbledore | `['middle', 'last']`          | Percival Dumbledore       |
| My name is Albus Percival Dumbledore | `['last']`                    | Dumbledore                |

## Usernames

For examples detect Instagram handles or other social media usernames.

<aside class="notice">
Experimental: might not identify all cases.
</aside>

> Usernames Moderation Object Example:

```json
{
  "username": {
    "found": true,
    "mode": "SUSPICIOUS",
    "matches": ["@chris_93"]
  }
}
```

| Parameter   | Type             | Description                                                                                                                                                                                            |
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **matches** | array of strings | The detected values in order of probability of being correct.                                                                                                                                          |
| **found**   | boolean          | Indicates whether the content contains a username. This does not always correspond to if any matches are found - ex. the text might intent to share personal data, but an exact match cannot be found. |
| **mode**    | string           | The [detection mode](#detection-levels) that has been set for usernames in the project filter.                                                                                                         |

## Swear Words and Profanity

Detect profane and inappropriate words. Does not detect toxic language without swear words - for example: "You are a monkey". To handle such use-cases we recommend our toxicity analyzer.

<aside class="notice">
Experimental: might return false positives.
</aside>

<aside class="notice">
Only works with english language - additional languages can be added upon request - contact us at support@moderationapi.com.
<br>
Fails gracefully on other languages than english with a normal response with empty matches.
</aside>

> Profanity Moderation Object Example:

```json
{
  "profanity": {
    "found": true,
    "mode": "NORMAL",
    "matches": ["fuck"]
  }
}
```

| Parameter   | Type             | Description                                                                                    |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| **matches** | array of strings | The detected profane words.                                                                    |
| **found**   | boolean          | Indicates whether the content contains profane words.                                          |
| **mode**    | string           | The [detection mode](#detection-levels) that has been set for profanity in the project filter. |

### Examples

| Value      | Detected by                         | Matches    |
| ---------- | ----------------------------------- | ---------- |
| fuck       | `NORMAL`, `SUSPICIOUS` , `PARANOID` | fuck       |
| ffuuccckkk | `SUSPICIOUS` , `PARANOID`           | ffuuccckkk |
| kcuf       | `PARANOID`                          | kcuf       |

```



```

# Analyzing

## Overview

Use our analyzers to make general conclusions about a text. <br>
All analyzers are found under `/api/v1/analyze/...`

## Detect Language

> `POST /api/v1/analyze/language`

```shell
curl "https://moderationapi.com/api/v1/analyze/language" \
  -H "Authorization: Bearer API_KEY"
  -H "Content-Type: application/json"
  -d `{
       "value": "This is an english text"
     }`
```

> Detect Language Response Example:

```json
{
  "code": "en", // in ISO 639
  "name": "ENGLISH",
  "score": 96,
  "reliable": true
}
```

Detect what language a text is written in `/api/v1/analyze/language`.
Probabilistically detects over 160 languages.

<aside class="notice">
  Does not count against moderation quota.
</aside>

### Parameters

| Parameter | Type   | Description                                                             |
| --------- | ------ | ----------------------------------------------------------------------- |
| **value** | string | The text you want to analyze. Limited to 10.000 characters per request. |

### Returns

Returns an object with the detected language.

| Parameter    | Type    | Description                                                                           |
| ------------ | ------- | ------------------------------------------------------------------------------------- |
| **code**     | string? | The ISO 639 of the language. Returns null if the analyzer fails.                      |
| **name**     | string? | An UPPERCASE name of the language. Returns null if the analyzer fails.                |
| **score**    | int     | 0-100 score with 100 meaning a high probability of being correct. Returns 0 on fails. |
| **reliable** | int     | The analyzer is reasonably confident about this guess, e.g. the score is high.        |
| **error**    | string? | If the analyzer failed an error will be returned.                                     |

```

```
