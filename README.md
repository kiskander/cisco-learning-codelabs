
# Guide

## How to Contribute Content

1. Install Hugo ([instructions](https://gohugo.io/getting-started/installing/))
4. Write a post under `site/content/posts/<your directory>` directory in markdown.
    - Markdown Cheatsheet can be found [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
4. Run `hugo server -D` in `site` for local testing
    - You don't have to kill and run this process whenever you add or update content. Hugo local server auto-refreshes
5. Commit & Pull Request

### Create your initial codelabs

- Create a new markdown file `file.md` in your newly created directory `site/content/posts/<your directory>`
- Use this [Codelabs Template](/sample/markdown-template/codelab.md) to create your first Codelab

#### Fill-in the header metadata
Copy and paste the headers below into your markdown file and change the values appropriately.
Guidelines are available below the sample headers.
```
---
title: <LAB TITLE>
updated: <YYYY-MM-DD>
categories: [<MAIN_CATEGORY>, <SUB_CATEGORY>]
tags: [TAG1, TAG2, ...]
duration: <MM:SS>
authors: <AUTHOR NAME>
---
```
Metadata consists of key-value pairs of the form "key: value". Keys cannot
contain colons, and separate metadata fields must be separated by blank lines.
At present, values must all be on one line. All metadata must come before the
title. Any arbitrary keys and values may be used; however, only the following
will be understood by the renderer:

* Categories: A comma-separated list of the topics the codelab covers. The categories can have two values. The first is the main, and the second is the sub, and they will appear at the bottom of the card in the front page. Only the main category is used to filter by categories and colorize the bottom color of the card.
Here is the list of currently supported categories:

  - mlops (Machine Learning Operations)
  - gcp (Google Cloud Platform)
  - tfx (TensorFlow Extended)
  - More coming!

* Tags: A comma-separated list of tags describing your codelab. This field helps with searching
* Duration: The time it takes to complete the entire codelab. Typically the sum of all steps


### Steps

- Each step should be contained with `{{< step >}}` template string like below. You can give title for each step with the `label` attribute, and the estimated duration can be specified in `duration` attribute as well.

```
{{< step label="Overview" duration="1:00" >}}

<WRITE YOUR OWN CONTENT>

{{< /step >}}
```

Replace `<WRITE YOUR OWN CONTENT>` with your step text and images utilizing Markdown format. If you need to include images, you can put images in `site/content/posts/<lab name>/images` directory.  Create the `images` directory if it does not exist.

*Example Markdown to include image:*
`![IMAGE](images/IMAGE.png)` 

- To create additional steps just copy the above block below the previous step and edit as usual.

### Resources 
- [Codelabs Template](https://raw.githubusercontent.com/kiskander/cisco-learning-codelabs/main/sample/markdown-template/codelab.md)
- [How to write a codelab](https://kiskander.github.io/cisco-learning-codelabs/posts/write-a-codelab/)
- [Markdown format Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

### Considerations

- Make the **title** more noticeable within **no more than 60 characters** long.
- `Overview` and `Call to Action` steps are mandatory and must be at the beginning and end of your guide (see [template](/sample/markdown-template/codelab.md))
- Always **add environmental setup** for readers to reproduce the Codelab.
- Keep each steps as compact as possible:
  - Don't try to explain every underlying technologies.
  - Add links to other resources for keeping things compact and interesting to the readers.
