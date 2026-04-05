---
layout: page
title: Projects
permalink: /projects/
description: Master's project archive centered on industry-sponsored research.
nav: true
nav_order: 1
horizontal: true
---

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
