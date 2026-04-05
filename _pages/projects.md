---
layout: page
title: projects
permalink: /projects/
description: Graduate project archive for industry-sponsored work, personal research, and technical presentation outputs.
nav: true
nav_order: 1
horizontal: true
---

This archive collects work completed during my master's program.
I keep industry projects, personal research, and presentation outputs in one place instead of splitting them into separate top-level menus.

Each project page follows the same structure:

- overview and problem setting
- method and workflow
- direct contribution
- results and outputs

<div class="projects">
  {% assign sorted_projects = site.projects | sort: "importance" %}
  <div class="container">
    <div class="row row-cols-1">
      {% for project in sorted_projects %}
        {% include projects_horizontal.liquid %}
      {% endfor %}
    </div>
  </div>
</div>
