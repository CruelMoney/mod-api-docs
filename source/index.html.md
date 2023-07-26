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

The moderation API automates advanced text analysis tasks.

- Identify personal information and mask it out - also if the user attempts to evade detection.
- Detect toxic content in real time.
- Detect and remove profanity - also if the user attempts to evade detection.
- Analyze the quality of a text and prevent spam.
- Detect the language of a text.
- Remove sensitive data from text.

The basic workflow is simple:

1. Define what [type of data](#filter-object) you want to detect.
2. [Send a request](#text-moderation) to the API with content.
3. We send back the detected values and original content with masked out values.

![Moderation api detection](/images/example.png "Moderation API detection")

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

## Calling the API from browsers

> Detecting emails using javascript and fetch:

```javascript
const text = "Hello my email is chris@moderationapi.com. What is yours?";

const data = await fetch(
  `https://moderationapi.com/api/v1/moderation/text?value=${encodeURIComponent(
    text
  )}`,
  {
    // Ideally the api key should not be included here, but only server side.
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }
);

const { content } = await data.json();
// content = "Hello my email is {{ email hidden }}. What is yours?"
```

We recommend to only use the API server-side to avoid exposing your API key. Usually your server would call the API with some text before storing it in your database, and optionally store the original text alongside the moderated text.

Even though it's not recommended, it is still possible to call the API client-side from javascript. See the example to the right.

# Account

> Account endpoint

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

It will respond with your quota levels and current usage levels. Usage resets the 1st each month UTC time..

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
We recommend update your filter from the moderation dashboard here: [https://moderationapi.com/app/projects](https://moderationapi.com/app/projects)

You can also update the filter programmatically using the API through [updating a project](#update-a-project).

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
| **sensitive** | object | Data type settings for sensitive numbers detection. [See more](#sensitive-numbers) |
| **[modelId]** | object | Data type settings for a custom model. [See more](#custom-models)                  |

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

We recommend update your filter from the moderation dashboard here: [https://moderationapi.com/app/projects](https://moderationapi.com/app/projects).

Otherwise a filter can be updated using the [project update endpoint](#update-a-project).

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

The default API rate limit is 10 requests per 10 seconds.

We may reduce limits to prevent abuse, or increase limits to enable high-traffic applications. To request an increased rate limit, please contact support.

### Handling rate limts

A basic technique for integrations to gracefully handle limiting is to watch for `429` status codes and build in a retry mechanism. The retry mechanism should follow an exponential backoff schedule to reduce request volume when necessary.

# Moderation

## Overview

The moderation API works by submitting content to the API and you get back the cleaned content and matches for the type of data you're looking for.

You can analyze text using 3 types of models:

- [Built-in models](#built-in-models)
- [Custom models](#custom-models)
- [AI Agents](#ai-agents)

The models are added to a project in the dashboard, and then used through the endpoint `/api/v1/moderation/text`.

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
  "flagged": true,
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

| Parameter             | Type    | Description                                                                                                                                                                |
| --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **status**            | string  | error or success.                                                                                                                                                          |
| **content**           | string  | The moderated string. If masking is turned on in the [filter](#filter) all detected values will be hidden.                                                                 |
| **content_moderated** | boolean | A boolean indicating if the returned content is different from the original text.                                                                                          |
| **data_found**        | boolean | A boolean indicating if any data has been found. Equal to checking each `found` field on the data types.                                                                   |
| **flagged**           | boolean | A boolean indicating if any of the models got triggered by the text. You might need to check the score of each model for a more precise result depending on your use case. |
| **[model_id]**        | object  | Each enabled data type get's it's own field in the response. Only included if detection is enabled for the data type. See the responses for each data type below.          |

# Built-in models

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

Detect profane and inappropriate words. Does not detect toxic language without swear words - for example: "You are a monkey". To handle such use-cases we recommend our [toxicity analyzer](#toxicity-analyzer).

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

## Sensitive numbers

This model detects a range of sensitive information:

- **Personal Numbers**: detect social security numbers, driver IDs, passport numbers, etc.
- **Bank Accounts**: detect account numbers and routing numbers.
- **Payment Cards**: detect card numbers, expiry dates and CVV.
- **Passwords**: detect passwords and 4-digit pin codes.
- **Digital Addresses**: detect IP-addresses and MAC addresses.

> Sensitive Numbers Moderation Object Example:

```json
{
  "sensitive": {
    "found": true,
    "mode": "NORMAL",
    "matches": ["password1234", "4242 4242 4242 4242"],
    "components": [
      {
        "password": "password1234",
        "credit_debit_number": "4242 4242 4242 4242"
      }
    ]
  }
}
```

| Parameter   | Type             | Description                                                                                            |
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| **matches** | array of strings | The detected values words.                                                                             |
| **found**   | boolean          | Indicates whether the content contains sensitive numbers.                                              |
| **mode**    | string           | The [detection mode](#detection-levels) that has been set for sensitive numbers in the project filter. |

## Language Analyzer

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
  "label": "ENGLISH",
  "score": 96,
  "reliable": true
}
```

Detect what language a text is written in `/api/v1/analyze/language`.
Probabilistically detects over 160 languages. We're not listing all the languages here, but if you need a comprehensive list, please message us.

<aside class="notice">
  Does not count against moderation quota.
</aside>

### Parameters

| Parameter | Type   | Description                                                             |
| --------- | ------ | ----------------------------------------------------------------------- |
| **value** | string | The text you want to analyze. Limited to 10.000 characters per request. |

### Returns

Returns an object with the detected language.

| Parameter    | Type    | Description                                                                       |
| ------------ | ------- | --------------------------------------------------------------------------------- |
| **code**     | string? | The ISO 639 of the language. Returns null if the analyzer fails.                  |
| **label**    | string? | An UPPERCASE name of the language. Returns null if the analyzer fails.            |
| **score**    | int     | 0-1 score with 1 meaning a high probability of being correct. Returns 0 on fails. |
| **reliable** | int     | The analyzer is reasonably confident about this guess, e.g. the score is high.    |
| **error**    | string? | If the analyzer failed an error will be returned.                                 |

## Toxicity Analyzer

> `POST /api/v1/analyze/toxicity`

```shell
curl "https://moderationapi.com/api/v1/analyze/toxicity" \
  -H "Authorization: Bearer API_KEY"
  -H "Content-Type: application/json"
  -d `{
       "value": "I will make you regret that"
     }`
```

> Detect Toxicity Response Example:

```json
{
  "label": "TOXICITY",
  "label_scores": {
    "TOXICITY": 0.80321377,
    "PROFANITY": 0.16329151,
    "DISCRIMINATION": 0.12677783,
    "NEUTRAL": 0.17654026
  }
}
```

Works on the whole text to detect general features like profanity, swearing, racism, threats etc. `/api/v1/analyze/toxicity`. Contrary to our [profanity filter](#swear-words-and-profanity) the toxicity analyzer will detect cases where the profanity is not as pronounced.

### Labels

| Label              | Description                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **TOXICITY**       | The general toxicity. If any other labels have a high score, this one is likely to score high as well. |
| **PROFANITY**      | Containing swearing, curse words, and other obscene language.                                          |
| **DISCRIMINATION** | Racism and other discrimination based on race, religion, gender, etc.                                  |
| **NEUTRAL**        | Nothing toxic was detected.                                                                            |

### Parameters

| Parameter | Type   | Description                                                             |
| --------- | ------ | ----------------------------------------------------------------------- |
| **value** | string | The text you want to analyze. Limited to 10.000 characters per request. |

### Returns

Returns an object with the detected label and respective scores.

| Parameter        | Type    | Description                                                                                                   |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| **label**        | string? | The most probable label. Returns null if the analyzer fails.                                                  |
| **label_scores** | obejct  | An object containing all the label scores. From 0-1 score with 1 meaning a high probability of being correct. |

## Quality Analyzer

> `POST /api/v1/analyze/quality`

```shell
curl "https://moderationapi.com/api/v1/analyze/quality" \
  -H "Authorization: Bearer API_KEY"
  -H "Content-Type: application/json"
  -d `{
       "value": "Want to get rich quick? Go to quickmoney.sx and sign up."
     }`
```

> Analyze Quality Response Example:

```json
{
  "label": "SPAM",
  "label_scores": {
    "SPAM": 0.9337343,
    "INCOHERENT": 0.89032257,
    "UNSUBSTANTIAL": 0.68944305,
    "NEUTRAL": 0.0662657
  }
}
```

Detect spam and insubstantial text, etc. `/api/v1/analyze/quality`.

### Labels

| Label             | Description                                                           |
| ----------------- | --------------------------------------------------------------------- |
| **UNSUBSTANTIAL** | Trival or short content.                                              |
| **INCOHERENT**    | Difficult to understand and nonsensical.                              |
| **SPAM**          | Repetitive, irrelevant content trying to make you visit a website eg. |
| **NEUTRAL**       | The text is relativey high quality.                                   |

### Parameters

| Parameter | Type   | Description                                                             |
| --------- | ------ | ----------------------------------------------------------------------- |
| **value** | string | The text you want to analyze. Limited to 10.000 characters per request. |

### Returns

Returns an object with the detected label and respective scores.

| Parameter        | Type    | Description                                                                                                   |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| **label**        | string? | The most probable label. Returns null if the analyzer fails.                                                  |
| **label_scores** | obejct  | An object containing all the label scores. From 0-1 score with 1 meaning a high probability of being correct. |

## Propriety Analyzer

> `POST /api/v1/analyze/propriety`

```shell
curl "https://moderationapi.com/api/v1/analyze/propriety" \
  -H "Authorization: Bearer API_KEY"
  -H "Content-Type: application/json"
  -d `{
       "value": "Can I get your number? 💦"
     }`
```

> Analyze Propriety Response Example:

```json
{
  "label": "FLIRTATION",
  "label_scores": {
    "FLIRTATION": 0.7784964,
    "SEXUALLY_EXPLICIT": 0.315303,
    "NEUTRAL": 0.2215036
  }
}
```

Detect sexual and flirty language. `/api/v1/analyze/propriety`. Closely related to the toxicity endpoint but specialized to detect more subtle inappropriate comments.

### Labels

| Label                 | Description                                   |
| --------------------- | --------------------------------------------- |
| **FLIRTATION**        | Pickup lines, compliments on appearance, etc. |
| **SEXUALLY_EXPLICIT** | References to sexual acts, body parts, etc.   |
| **NEUTRAL**           | The text is relativey high quality.           |

### Parameters

| Parameter | Type   | Description                                                             |
| --------- | ------ | ----------------------------------------------------------------------- |
| **value** | string | The text you want to analyze. Limited to 10.000 characters per request. |

### Returns

Returns an object with the detected label and respective scores.

| Parameter        | Type    | Description                                                                                                   |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| **label**        | string? | The most probable label. Returns null if the analyzer fails.                                                  |
| **label_scores** | obejct  | An object containing all the label scores. From 0-1 score with 1 meaning a high probability of being correct. |

## NSFW Analyzer

> `POST /api/v1/analyze/nsfw`

```shell
curl "https://moderationapi.com/api/v1/analyze/nsfw" \
  -H "Authorization: Bearer API_KEY"
  -H "Content-Type: application/json"
  -d `{
       "value": "How do i make a bomb?"
     }`
```

> Analyze NSFW Response Example:

```json
{
  "label": "UNSAFE",
  "score": 0.67743,
  "label_scores": {
    "UNSAFE": 0.67743,
    "SENSITIVE": 0.321657,
    "NEUTRAL": 0.000897
  }
}
```

Detect unsafe and sensitive topics. Useful for detecting content that might be inappropriate for children. Sensitive topics include, but are not limited to, violence, weapons, drugs, politics, religion, etc.

### Labels

| Label         | Description                            |
| ------------- | -------------------------------------- |
| **UNSAFE**    | Violence, weapons, drugs, sexual, etc. |
| **SENSITIVE** | Politics, religion, etc.               |
| **NEUTRAL**   |                                        |

### Parameters

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| **value** | string | The text you want to analyze. |

### Returns

Returns an object with the detected label and respective scores.

| Parameter        | Type    | Description                                                                                                   |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| **label**        | string? | The most probable label. Returns null if the analyzer fails.                                                  |
| **label_scores** | obejct  | An object containing all the label scores. From 0-1 score with 1 meaning a high probability of being correct. |
| **score**        | number  | The score of the most probable label.                                                                         |

## Sentiment Analyzer

> `POST /api/v1/analyze/sentiment`

```shell
curl "https://moderationapi.com/api/v1/analyze/sentiment" \
  -H "Authorization: Bearer API_KEY"
  -H "Content-Type: application/json"
  -d `{
       "value": "It was a dreadful day."
     }`
```

> Analyze Sentiment Response Example:

```json
{
  "label": "NEGATIVE",
  "score": 0.999568,
  "label_scores": {
    "NEGATIVE": 0.999568,
    "NEUTRAL": 0,
    "POSITIVE": 0
  }
}
```

The sentiment analyzer is trained to detect the sentiment of a text. It can detect positive, negative and neutral sentiment.

### Labels

| Label        | Description        |
| ------------ | ------------------ |
| **NEGATIVE** | Negative sentiment |
| **POSITIVE** | Positive sentiment |
| **NEUTRAL**  |                    |

### Parameters

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| **value** | string | The text you want to analyze. |

### Returns

Returns an object with the detected label and respective scores.

| Parameter        | Type    | Description                                                                                                   |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| **label**        | string? | The most probable label. Returns null if the analyzer fails.                                                  |
| **label_scores** | obejct  | An object containing all the label scores. From 0-1 score with 1 meaning a high probability of being correct. |
| **score**        | number  | The score of the most probable label.                                                                         |

# Custom models

## Overview

Consider creating custom models tailored to your specific needs, aiming to improve accuracy under special use cases. <br>
Custom models work similar to the default analyzers, but you can train them to detect specific labels. <br>
All custom models can be used from `/api/v1/analyze/{modelId}` or using the moderation endpoint: `/api/v1/moderation/text` if the model has been added to a project in your dashboard.

## Creating a custom model

Create and train custom models from your dashboard. In the dashboard you can create your own labels, and import data to train the model on.<br>
The model will work best if you can provide minimum 100 examples for each label you want to detect. <br>

See a detailed guide on how to create a custom model here: [https://moderationapi.com/blog/custom-classifier-ai-models/](https://moderationapi.com/blog/custom-classifier-ai-models/)

## Using a custom model

> `POST /api/v1/analyze/[modelId]`

```shell
curl "https://moderationapi.com/api/v1/analyze/[modelId]" \
  -H "Authorization: Bearer API_KEY"
  -H "Content-Type: application/json"
  -d `{
       "value": "How are you doing?"
     }`
```

> Custom model Response Example:

```json
{
  "label": "LABEL_1",
  "label_scores": {
    "LABEL_1": 0.7784964,
    "LABEL_2": 0.315303,
    "LABEL_3": 0.2215036
  }
}
```

It is recommended to use custom models by adding them to a project in your dashboard. <br>

### Parameters

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| **value** | string | The text you want to analyze. |

### Returns

Returns an object with the detected label and respective scores.

| Parameter        | Type    | Description                                                                                                   |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| **label**        | string? | The most probable label. Returns null if the analyzer fails.                                                  |
| **label_scores** | obejct  | An object containing all the label scores. From 0-1 score with 1 meaning a high probability of being correct. |

## Limits

### Characters

Your monthly quota is measured based on a count of 1 for every 1000 characters. <br>

### Training examples

Custom models can have a maximum of 5000 training examples, which should be sufficient for most scenarios. However, if you require additional training examples, please reach out to our support team. Additionally, each training example can have a maximum length of 10,000 characters.

# AI Agents

## Overview

AI Agents are great if you don't have a lot of training data, or if you want to get started quickly. <br>

However they might not perform as well as a properly trained custom model.

## Creating an AI Agent

When creating an AI Agent you first have to add your guidelines / rules for the agent to follow. Here it's best to very sepcific but keep it simple. <br>

You can also set a strictness level for the agent. This will determine how strict the agent is when detecting content. For example the easygoing agent might let some mild violations through, while the strict agent will be better safe than sorry.

## Using an AI Agent

Add your newly created AI agent to a project in the dashboard and consume it from the [moderation endpoint](#moderation).

> AI Agent Response Example:

```json
{
  "label": "RULE_1",
  "score": 1,
  "rule": "No rude comments",
  "label_scores": {
    "NEUTRAL": 0,
    "RULE_1": 1,
    "RULE_2": 0,
    "RULE_3": 0
  }
}
```

### Parameters

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| **value** | string | The text you want to analyze. |

### Returns

Returns an object with the result of the agent's analysis. To stay consistent with the other analyzers, the agent will return a label and a score. The label will be `RULE_n` where n is the number of the rule that was triggered, and the score will always be 1. <br>

If no rules are triggered, the label will be `NEUTRAL`.

| Parameter        | Type    | Description                                                                                |
| ---------------- | ------- | ------------------------------------------------------------------------------------------ |
| **label**        | string? | The name of the rule that was triggered. Returns `NEUTRAL` if no rules were triggered.     |
| **score**        | number  | The score of the most probable label. Always 1 or 0.                                       |
| **rule**         | string? | The description of the rule that was triggered. Returns `null` if no rules were triggered. |
| **label_scores** | obejct  | An object containing all the rules with either 0 or 1 as the score.                        |
