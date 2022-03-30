---
title: How to Write a Codelab
id: how-to-write-a-codelab
description: Learn how to create content and some of the available features!
updated: 2002-03-28
categories: [code]
tags: [code]
status: Published
authors: Kareem Iskander
duration: 5
---

<!-- Overview Step is a required step and must be at the beginning of each codelab -->

{{< step label="Overview" duration="1:00" >}}
### What you’ll Learn
- How to create steps
- How to include code snippets
- How to include links and images
- Call to Action

### What you'll need
- Any required application or library 
- Access to a Sandbox
{{</step >}}


{{< step label="How to create steps" duration="1:00" >}}
- Each step should be contained with `{ {< step >}}` template string like below. 
- You can give title for each step with the `label` attribute, and the estimated duration can be specified in `duration` attribute as well.

<!-- When defining steps, Make sure there is no spaces between the brackets {{ -->

```
{ {<step label="Overview" duration="1:00" >}}

WRITE YOUR OWN CONTENT

{ {<step>}}
```
{{</step >}}


{{<step label="How to include code snippets" duration="3:00" >}}
To include code snippets you can do a few things.
- Inline highlighting can be done using the tiny tick mark on your keyboard: "`"
- Embedded code

### Python

```python
import requests
```

### JavaScript

```javascript
{ 
  key1: "string", 
  key2: integer,
  key3: "string"
}
```

### Java

```java
for (statement 1; statement 2; statement 3) {
  // code block to be executed
}
```
{{</step >}}

{{<step label="Hyperlinking and Embedded Images" duration="1:00" >}}
## Hyperlinking
[Snack Minute](https://www.youtube.com/playlist?list=PL2k86RlAekM-Qdu_In2-8B1YT6c66MnY0)

## Images
![alt-text-here](./images/sm.png)
{{</step >}}


<!-- Call to Action Step is a required step and must be at the end of each codelab -->
{{<step label="Congratulations" duration="1:00" >}}
## Learn More
- Link to Learning Content in new LXP
- Link to other walkthroughs 
- Link to Marketing offer page


{{</step >}}
