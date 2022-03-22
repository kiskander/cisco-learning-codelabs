
# Guide

## How to Contribute Content

1. Install Hugo ([instructions](https://gohugo.io/getting-started/installing/))
    - On MacOS use `brew install hugo`
2. Run `./run_dev_server.sh` in root of the repository for local test
    - You don't have to kill and run this process whenever you add more contents or make changes. You can see the reflected changes if you refresh the browser.
3. Create a new Lab!
4. Commit, push & pull request!

## Creating a new Lab

### Using Template

Use the helper script to create a new lab! Each post will be shown as a card on the front page when rendered.


```shell
./create_new_lab.sh
Please provide the name of the lab to create.  Avoid special
characters, symbols that would result in an invalid URL.

Lab Name: Tony's Lab

Creating lab: tonys-lab
Content dir "cisco-learning-codelabs/site/content/posts/tonys-lab" created
```

### Manually

Create a new content directory in the `site/posts/` directory.  Make sure to use ["slug"](https://pypi.org/project/python-slugify/) format for the contents directory name. Each post will be shown as a card on the front page when rendered.

Content is written into the `index.md` file within the content's post directory.

*Example:*
`site/content/posts/tonys-lab/index.md`

### Front Matter

The `index.md` file for the content needs to have the following front matter defined before adding the content steps.

```
---
title: <LAB TITLE>
date: <YYYY-MM-DD>
categories: [<MAIN_CATEGORY>, <SUB_CATEGORY>]
tags: [TAG1, TAG2, ...]
duration: <MM:SS>
authors: <AUTHOR NAME>
---
```

The categories can have two values. The first is the main, and the second is the sub, and they will appear at the bottom of the card in the front page. Only the main category is used to filter by categories and colorize the bottom color of the card. Here is the list of currently supported categories:

- mlops (Machine Learning Operations)
- gcp (Google Cloud Platform)
- tfx (TensorFlow Extended)
- More coming!

### Steps

Each step should be contained with `{{< step >}}` template string like below. You can give title for each step with the `label` attribute, and the estimated duration can be specified in `duration` attribute as well.

```
{{< step label="Overview" duration="1:00" >}}

<WRITE YOUR OWN CONTENT>

{{< /step >}}
```

Replace `<WRITE YOUR OWN CONTENT>` with your step text and images utilizing Markdown format. If you need to include images, you can put images in `site/content/posts/<lab name>/images` directory.  Create the `images` directory if it does not exist.

*Example Markdown to include image:*
`![IMAGE](images/IMAGE.png)` 

To create additional steps just copy the above block below the previous step and edit as usual.

### Considerations

- Make the **title** more noticible within **no more than 60 characters** long.
- Always **add environmental setup** for readers to reproduce the lab.
- Keep each steps as compact as possible:
  - Don't try to explain every underlying technologies.
  - Add links to other resources for keeping things compact and interesting to the readers.