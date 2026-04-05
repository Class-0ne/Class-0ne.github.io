---
layout: page
title: Projects
permalink: /projects/
description: Master's project archive centered on industry-sponsored research, predictive control, and EV thermal management.
nav: true
nav_order: 1
horizontal: true
---

이 페이지는 석사과정 동안 수행한 주요 프로젝트를 정리한 아카이브입니다.
각 프로젝트는 배경, 접근 방법, 내 기여, 결과를 중심으로 간결하게 정리했습니다.

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
