---
layout: about
title: about
permalink: /
subtitle: Graduate portfolio for industry-sponsored projects, research studies, and technical presentations.

profile:
  align: right
  image: profile-placeholder.svg
  image_circular: false
  more_info: >
    <p>M.S. student in [Department], [University]</p>
    <p>Based in South Korea</p>
    <p>Portfolio, CV, and graduate project archive</p>

selected_papers: false
social: true

announcements:
  enabled: false

latest_posts:
  enabled: false
---

I am using this site as a combined **portfolio**, **CV**, and **graduate project archive**.

The main goal is simple: keep the strongest work easy to review for job applications while also preserving enough detail for my own records.
The full archive lives in the [Projects]({{ '/projects/' | relative_url }}) page, and the homepage highlights only the most important work.

## What this site is organized around

- **Industry-sponsored projects** as the main portfolio narrative.
- **Personal research studies** that show technical depth beyond the main sponsored work.
- **Presentation outputs** such as posters and oral presentations, attached to the relevant project pages rather than split into separate menu items.

## Featured projects

{% assign featured_projects = site.projects | sort: "importance" | slice: 0, 3 %}
<div class="projects">
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in featured_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>

## Project page template

Each project page should answer four questions:

1. What problem was being solved?
2. What method, model, or workflow was used?
3. What did I contribute directly?
4. What outputs came out of it?

Typical outputs include posters, oral presentation slides, reports, figures, code, and validation results.

## Navigation plan

- The homepage introduces the overall direction of the work.
- [Projects]({{ '/projects/' | relative_url }}) contains the full master's archive.
- [CV]({{ '/cv/' | relative_url }}) stays short and readable for applications.

This keeps the site simple while still making the graduate work easy to browse.
